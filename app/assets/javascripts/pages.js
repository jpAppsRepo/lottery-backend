$(document).ready(function () {
    var admin_table = $('#admin-table').DataTable({
        dom: 'Bfrtip',
        select: true,
        oLanguage: {
            sSearch: "Хайх:",
            emptyTable: 'Бичлэг олдсонгүй.'
        },
        ajax: {
            url: '/dataset',
            dataSrc: 'items',
        },
        columns: [
            {   "data": null,
                defaultContent: '',
                searchable: false,
                orderable: false 
            },
            {title: 'ID', data: 'id', class: 'id-column'},
            {title: 'Худалдан авсан огноо', data: 'purchase_date', class: 'purchase_date-column'},
            {title: 'Байршил', data: 'location', class: 'location-column'},
            {title: 'Утасны дугаар', data: 'phone_number', class: 'phone_number-column'},
            {title: 'Овог', data: 'surname', class: 'surname-column'},
            {title: 'Нэр', data: 'name', class: 'name-column'},
            {title: 'Худалдан авсан бүтээгдэхүүн', data: 'product_name', class: 'product_name-column'},
            {title: 'Үнийн дүн', data: 'price_info', class: 'price_info-column'},
            {title: 'Утасны IMEI код', data: 'phone_imei', class: 'phone_imei-column'}
        ],
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },
        buttons: [
            {
                className: 'add',
                text: 'Нэмэх',
                action: function ( e, dt, node, config ) {
                    $('#itemModal').modal('show');
                    $('#itemForm')[0].reset();
                    $('.modal-title').html("<i class='fa fa-plus'></i> Мэдээлэл нэмэх");
                    $('#action').val('addItem');
                    $('#save').val('Нэмэх');
                    // alert(
                    //     'Row data: '+
                    //     JSON.stringify( dt.row( { selected: true } ).data() )
                    // );
                },
                enabled: true
            },
            {
                className: 'edit',
                text: 'Засах',
                action: function ( e, dt, node, config ) {
                    var row_data = JSON.parse(JSON.stringify( dt.row( { selected: true } ).data() ));
                    $('#itemModal').modal('show');
                    $('#id').val(row_data.id);
                    $('#purchase_date').val(row_data.purchase_date);
                    $('#location').val(row_data.location);
                    $('#phone_number').val(row_data.phone_number);
                    $('#surname').val(row_data.surname);	
                    $('#name').val(row_data.name);	
                    $('#product_name').val(row_data.product_name);	
                    $('#price_info').val(row_data.price_info);	
                    $('#phone_imei').val(row_data.phone_imei);	
                    $('.modal-title').html("<i class='fa fa-plus'></i> Засах");
                    $('#action').val('updateItem');
                    $('#save').val('Save');
                },
                enabled: false
            },
            {
                className: 'delete',
                text: 'Устгах',
                action: function ( e, dt, node, config ) {
                    var row_data = JSON.parse(JSON.stringify( dt.row( { selected: true } ).data() ));
                    console.log(row_data.id);		
                    if(confirm("Бичлэгийг устгахыг зөвшөөрч байна уу?")) {
                        $.ajax({
                            url:"/dataset",
                            method:"DELETE",
                            data:{ 
                                Id: row_data.id
                            },
                            success:function(data) {					
                                admin_table.ajax.reload();
                            },
                            error: function (errormessage) {
                                alert(JSON.stringify(errormessage));
                            }
                        })
                    } else {
                        return false;
                    }
                },
                enabled: false
            }
        ],
        order: [['1', 'asc']],
        tfoot: {
            'font-size': '8px'
        }
    });

    // Add modal handler
    $("#itemModal").on('submit','#itemForm', function(event){
        event.preventDefault();
        var action_type = $('#action').val();
        $('#save').attr('disabled','disabled');
        var formData = $(this).serializeArray();
        let jsonObject = {};
        $(formData).each(function(index, obj){
            jsonObject[obj.name] = obj.value;
        });
        var newdata = JSON.stringify(jsonObject);
        if( action_type == 'addItem'){
            $.ajax({
                url:"/dataset",
                method:"POST",
                contentType: 'application/json',
                data: newdata,
                success:function(data){				
                    $('#itemForm')[0].reset();
                    $('#itemModal').modal('hide');				
                    $('#save').attr('disabled', false);
                    admin_table.ajax.reload();
                },
                error: function (errormessage) {
                    alert(JSON.stringify(errormessage));
                }
            })
        }
        else{
            $.ajax({
                url:"/dataset",
                method:"PUT",
                contentType: 'application/json',
                data: newdata,
                success:function(data){				
                    $('#itemForm')[0].reset();
                    $('#itemModal').modal('hide');				
                    $('#save').attr('disabled', false);
                    admin_table.ajax.reload();
                },
                error: function (errormessage) {
                    alert(JSON.stringify(errormessage));
                }
            })
        }
    });
    $("#employeeList").on('click', '.update', function(){
        var empId = $(this).attr("id");
        var action = 'getEmployee';
        $.ajax({
            url:'action.php',
            method:"POST",
            data:{empId:empId, action:action},
            dataType:"json",
            success:function(data){
                $('#employeeModal').modal('show');
                $('#empId').val(data.id);
                $('#empName').val(data.name);
                $('#empAge').val(data.age);
                $('#empSkills').val(data.skills);				
                $('#address').val(data.address);
                $('#designation').val(data.designation);	
                $('.modal-title').html("<i class='fa fa-plus'></i> Edit Employee");
                $('#action').val('updateEmployee');
                $('#save').val('Save');
            }
        })
    });		
    $("#employeeList").on('click', '.delete', function(){
		var empId = $(this).attr("id");		
		var action = "empDelete";
		if(confirm("Are you sure you want to delete this employee?")) {
			$.ajax({
				url:"action.php",
				method:"POST",
				data:{empId:empId, action:action},
				success:function(data) {					
					employeeData.ajax.reload();
				}
			})
		} else {
			return false;
		}
	});	

    // Adding footer 
    // $("#admin-table").append(
    //     $('<tfoot/>').append( $("#admin-table thead tr").clone() )
    // );
    // // Column based search
    // $('#admin-table tfoot th').each( function () {
    //     var title = $(this).text();
    //     $(this).html( '<input type="text" placeholder="'+title+'" style="white-space:pre-line;position:relative;top:-7px;font-size:8px" />' );
    // } );
    // admin_table.columns().every( function () {
    //     var that = this;
 
    //     $( 'input', this.footer() ).on( 'keyup change clear', function () {
    //         if ( that.search() !== this.value ) {
    //             that
    //                 .search( this.value )
    //                 .draw();
    //         }
    //     } );
    // } );
    // end

    admin_table.on( 'select deselect', function () {
        var selectedRows = admin_table.rows( '.selected' ).count();
        console.log(selectedRows);
        admin_table.button( 1 ).enable( selectedRows === 1 );
        admin_table.button( 2 ).enable( selectedRows > 0 );
    } );
    // var edit_button = admin_table.buttons( ['edit'] );
    // var delete_button = admin_table.buttons( ['delete'] );
    var rows = admin_table.rows( '.selected' );
 
    // $('#button').click( function () {
    //     alert( table.rows('.selected').data().length +' row(s) selected' );
    // } );

    $('#user-table').DataTable({
        ajax: {
            url: '/dataset',
            dataSrc: 'items',
        },
        language:{
            Search: "Хайх"
        },
        order: [['2', 'desc']],
        columns: [
            {title: 'Худалдан авсан огноо', data: 'purchase_date', class: 'purchase_date-column'},
            {title: 'Байршил', data: 'location', class: 'location-column'},
            {title: 'Утасны дугаар', data: 'phone_number', class: 'phone_number-column'},
            {title: 'Овог', data: 'surname', class: 'surname-column'},
            {title: 'Нэр', data: 'name', class: 'name-column'},
            {title: 'Худалдан авсан бүтээгдэхүүн', data: 'product_name', class: 'product_name-column'},
            {title: 'Үнийн дүн', data: 'price_info', class: 'price_info-column'},
            {title: 'Утасны IMEI код', data: 'phone_imei', class: 'phone_imei-column'}
        ]
    });
});



/* CRUD */
var counter = 1;
 
$('#addItem').on( 'click', function () {
    t.row.add( [
        counter +'.1',
        counter +'.2',
        counter +'.3',
        counter +'.4',
        counter +'.5'
    ] ).draw( false );

    counter++;
} );

// Automatically add a first row of data
$('#addItem').click();

$('#deleteItem').click(function () {
    $('tr.selected').each(function () {
        var $row = $(this);
        var store = $row.find('td:first').text();
        $.post('/dataset', {store_id: store}, function (response) {
            // if ( /* validation of response*/ ) {
                // table.row($row).remove();
            // }
        });
    });

    table.draw();
});

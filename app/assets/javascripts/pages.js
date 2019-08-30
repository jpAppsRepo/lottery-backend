$(document).ready(function () {
    var admin_table = $('#admin-table').DataTable({
        dom: 'Bfrtip',
        select: true,
        oLanguage: {
            "sSearch": "Хайх:"
        },
        ajax: {
            url: '/dataset',
            dataSrc: 'items',
        },
        columns: [
            {   "data": null,
                 defaultContent: '' 
            },
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
                    alert(
                        'Row data: '+
                        JSON.stringify( dt.row( { selected: true } ).data() )
                    );
                },
                enabled: true
            },
            {
                className: 'edit',
                text: 'Засах',
                action: function ( e, dt, node, config ) {
                    alert( 'Rows: '+ dt.rows( { selected: true } ).count() );
                },
                enabled: false
            },
            {
                className: 'delete',
                text: 'Устгах',
                action: function ( e, dt, node, config ) {
                    alert( 'Rows: '+ dt.rows( { selected: true } ).count() );
                },
                enabled: false
            }
        ],
        order: [['2', 'desc']],
    });

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

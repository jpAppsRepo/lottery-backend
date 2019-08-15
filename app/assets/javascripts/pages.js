
var editor; // use a global for the submit and return data rendering in the examples
$(document).ready(function () {
    editor = new $.fn.dataTable.Editor( {
        table: "#ajax-table",
        ajax: {
            create: {
                type: 'POST',
                contentType: 'application/json',
                url: '/dataset',
                data: function (d) {
                    var newdata;
                    $.each(d.data, function (key, value) {
                        newdata = JSON.stringify(value);
                    });
                    return newdata;
                 },
                success: function (result) {
                    $('#ajax-table').DataTable().ajax.reload();
                },
                error: function (errormessage) {
                    alert(JSON.stringify(errormessage));
                }
            },
            edit: {
                type: 'PUT',
                url: '/dataset',
                success: function (result) {
                    console.warn("success callback result=" + JSON.stringify(result));
                    // $('#ajax-table').click();
                    // toastr.success("Object updated");
                    $('#ajax-table').DataTable().ajax.reload();
                },
                error: function (xhr, error, thrown) {
                    // alert(JSON.stringify(errormessage));
                    console.warn("error callback xhr=" + JSON.stringify(xhr));
                }
            },
            remove: {
                type: 'DELETE',
                url: '/dataset',
                success: function (result) {
                    // table.ajax.reload();
                },
                error: function (errormessage) {
                    alert(JSON.stringify(errormessage));
                }
            }
        },
        idSrc:  'id',
        fields: [ {
                label: "Худалдан авсан огноо:",
                name: "purchase_date"
            }, {
                label: "Утасны дугаар:",
                name: "phone_number"
            }, {
                label: "Овог:",
                name: "surname"
            }, {
                label: "Нэр:",
                name: "name"
            }, {
                label: "Худалдан авсан бүтээгдэхүүн:",
                name: "product_name"
            }, {
                label: "Үнийн дүн:",
                name: "price_info",
            }, {
                label: "Утасны IMEI код:",
                name: "phone_imei"
            }
        ]
    } );

    // Activate an inline edit on click of a table cell
    // $('#ajax-table').on( 'click', 'tbody td:not(:first-child)', function (e) {
    //     editor.inline( this );
    // } );
    
    // $('#static-table').DataTable();
    $('#ajax-table').DataTable({
        dom: "Bfrtip",
        ajax: {
            url: '/dataset',
            dataSrc: 'items',
        },
        order: [['2', 'desc']],
        columns: [
            {
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },
            {title: 'Худалдан авсан огноо', data: 'purchase_date', class: 'purchase_date-column'},
            {title: 'Утасны дугаар', data: 'phone_number', class: 'phone_number-column'},
            {title: 'Овог', data: 'surname', class: 'surname-column'},
            {title: 'Нэр', data: 'name', class: 'name-column'},
            {title: 'Худалдан авсан бүтээгдэхүүн', data: 'product_name', class: 'product_name-column'},
            {title: 'Үнийн дүн', data: 'price_info', class: 'price_info-column'},
            {title: 'Утасны IMEI код', data: 'phone_imei', class: 'phone_imei-column'}
        ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },
        buttons: [
            { extend: "create", text: "Нэмэх", editor: editor },
            { extend: "edit", text: "Засах",   editor: editor },
            { extend: "remove", text: "Устгах", editor: editor }
        ]
    });

    $('#user-table').DataTable({
        ajax: {
            url: '/dataset',
            dataSrc: 'items',
        },
        order: [['2', 'desc']],
        columns: [
            {title: 'Худалдан авсан огноо', data: 'purchase_date', class: 'purchase_date-column'},
            {title: 'Утасны дугаар', data: 'phone_number', class: 'phone_number-column'},
            {title: 'Овог', data: 'surname', class: 'surname-column'},
            {title: 'Нэр', data: 'name', class: 'name-column'},
            {title: 'Худалдан авсан бүтээгдэхүүн', data: 'product_name', class: 'product_name-column'},
            {title: 'Үнийн дүн', data: 'price_info', class: 'price_info-column'},
            {title: 'Утасны IMEI код', data: 'phone_imei', class: 'phone_imei-column'}
        ]
    });
});

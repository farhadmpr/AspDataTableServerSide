$(document).ready(function () {
    $("#customerDatatable").DataTable({
        "processing": true,
        "serverSide": true,
        "filter": true,
        "ajax": {
            "url": "/api/customer",
            "type": "POST",
            "datatype": "json"
        },
        "columnDefs": [{
            "targets": [0],
            "visible": false,
            "searchable": false
        }],
        "columns": [
            { "data": "id", "name": "Id", "autoWidth": true },
            { "data": "firstName", "name": "First Name", "autoWidth": true },
            { "data": "lastName", "name": "Last Name", "autoWidth": true },
            { "data": "contact", "name": "Contact", "autoWidth": true },
            { "data": "email", "name": "Email", "autoWidth": true },
            { "data": "dateOfBirth", "name": "Date Of Birth", "autoWidth": true },
            {
                "render": function (data, type, row) { return "<a href='#' class='btn btn-danger' onclick=DeleteCustomer('" + row.id + "'); >Delete</a>"; }
            },
        ]
    });
});

function DeleteCustomer(id) {
    $.ajax({ url: `/api/customer/delete/${id}`, method: "DELETE" })
        .then(function (data) {
            $('#customerDatatable').dataTable().fnDeleteRow(id);
        })
        .catch(function (err) {
            alert('error');
        });
}
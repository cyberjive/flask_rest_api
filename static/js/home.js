/*
 * JavaScript file for the application to demonstrate
 * using the API
 */

// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function () {
    'use strict';

    let $event_pump = $('body');

    // Return the API
    return {
        'read': function () {
            let ajax_options = {
                type: 'GET',
                url: 'api/movies',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
                .done(function (data) {
                    $event_pump.trigger('model_read_success', [data]);
                })
                .fail(function (xhr, textStatus, errorThrown) {
                    $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
                })
        },
        create: function (mname, mgenre, mdatereleased, mruntime) {
            let ajax_options = {
                type: 'POST',
                url: 'api/movies',
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'mname': mname,
                    'mgenre': mgenre,
                    'mdatereleased': mdatereleased,
                    'mruntime': mruntime,
                })
            };
            $.ajax(ajax_options)
                .done(function (data) {
                    $event_pump.trigger('model_create_success', [data]);
                })
                .fail(function (xhr, textStatus, errorThrown) {
                    $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
                })
        },
        update: function (mname, mgenre, mdatereleased, mruntime) {
            let ajax_options = {
                type: 'PUT',
                url: 'api/movies/' + id,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'id': id,
                    'mname': mname,
                    'mgenre': mgenre,
                    'mdatereleased': mdatereleased,
                    'mruntime': mruntime,
                })
            };
            $.ajax(ajax_options)
                .done(function (data) {
                    $event_pump.trigger('model_update_success', [data]);
                })
                .fail(function (xhr, textStatus, errorThrown) {
                    $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
                })
        },
        'delete': function (id) {
            let ajax_options = {
                type: 'DELETE',
                url: 'api/movies/' + id,
                accepts: 'application/json',
                contentType: 'plain/text'
            };
            $.ajax(ajax_options)
                .done(function (data) {
                    $event_pump.trigger('model_delete_success', [data]);
                })
                .fail(function (xhr, textStatus, errorThrown) {
                    $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
                })
        }
    };
}());

// Create the view instance
ns.view = (function () {
    'use strict';

    let $id = $('#id')
    $mname = $('#mname'),
        $megnre = $('#mgenre'),
        $mdatereleased = $('#mdatereleased')
    $mruntime = $('#mruntime');

    // return the API
    return {
        reset: function () {
            $id.val('');
            $mname.val('');
            $mgenre.val('');
            $mdatereleased.val('');
            $mruntime.val('').focus();
        },
        update_editor: function (id, mname, mgenre, mdatereleased, mruntime) {
            $id.val('');
            $mname.val('');
            $mgenre.val('');
            $mdatereleased.val('');
            $mruntime.val('').focus();
        },
        build_table: function (movies) {
            let rows = ''

            // clear the table
            $('.movies table > tbody').empty();

            // did we get a movie array?
            if (movies) {
                for (let i = 0, l = movies.length; i < l; i++) {
                    rows += `<tr><td class="mname">${movie[i].mname}</td><td class="mgenre">${movies[i].mgenre}</td><td class="mdatereleased">${movies[i].mdatereleased}</td><td class="mruntime">${movies[i].mruntime}</td></tr>`;
                }
                $('table > tbody').append(rows);
            }
        },
        error: function (error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function () {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function (m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $mname = $('#mname'),
        $megnre = $('#mgenre');
    $mdatereleased = $('#mdatereleased');
    $mruntime = $('#mruntime');

    // Get the data from the model after the controller is done initializing
    setTimeout(function () {
        model.read();
    }, 100)

    // Validate input
    function validate(id, mname, mgenre, mdatereleased, mruntime) {
        return id !== "" && mname !== "" && mgenre !== "" && mdatereleased !== "" && mruntime !== "";
    }

    // Create our event handlers
    $('#create').click(function (e) {
        let id = $id.val(),
            mname = $mname.val(),
            mgenre = $mgenre.val(),
            mdatereleased = $mdatereleased.val(),
            mruntime = $mruntime.val();

        e.preventDefault();

        if (validate(id, mname, mgenre, mdatereleased, mruntime)) {
            model.create()
        } else {
            alert('Problem input');
        }
    });

    $('#update').click(function (e) {
        let id = $id.val(),
            mname = $mname.val(),
            mgenre = $mgenre.val(),
            mdatereleased = $mdatereleased.val(),
            mruntime = $mruntime.val();

        e.preventDefault();

        if (validate(id, mname, mgenre, mdatereleased, mruntime)) {
            model.update(id, mname, mgenre, mdatereleased, mruntime)
        } else {
            alert('Problem with first or last name input');
        }
        e.preventDefault();
    });

    $('#delete').click(function (e) {
        let id = $id.val();

        e.preventDefault();

        if (validate('placeholder', id)) {
            model.delete(id)
        } else {
            alert('Problem with input');
        }
        e.preventDefault();
    });

    $('#reset').click(function () {
        view.reset();
    })

    $('table > tbody').on('dblclick', 'tr', function (e) {
        let $target = $(e.target),
            id,
            mname,
            mgenre,
            mdatereleased,
            mruntime;

        id = $target
            .parent()
            .find('td.id')
            .text();

        mname = $target
            .parent()
            .find('td.mname')
            .text();

        mgenre = $target
            .parent()
            .find('td.mgenre')
            .text();

        mdatereleased = $target
            .parent()
            .find('td.mdatereleased')
            .text();


        mruntime = $target
            .parent()
            .find('td.mruntime')
            .text();

        view.update_editor(id, mname, mgenre, mdatereleased, mruntime);
    });

    // Handle the model events
    $event_pump.on('model_read_success', function (e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on('model_create_success', function (e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function (e, data) {
        model.read();
    });

    $event_pump.on('model_delete_success', function (e, data) {
        model.read();
    });

    $event_pump.on('model_error', function (e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));

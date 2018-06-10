function loadProjects() {
    if (page > -2 && !_inCallback) {
        _inCallback = true;
        page++;
        jQuery('div#loading').html('<img src="/Content/img/loading-image.gif" style="width:30px; height:30px;">');
        jQuery.get("/Projects/ProjectsList?pageNo=" + page , function (data) {
            if (data != '') {
                jQuery("form").unbind("submit");
                jQuery("#ProjectsList").append(data);
            }
            else {
                page = -2;
            }
            _inCallback = false;
            jQuery('div#loading').empty();
        });
    }
}
function InsertNewProect() {

    jQuery.ajax({
        url: '/Projects/Create',
        type: "GET",
        data: {},
        success: function (data) {

            jQuery("#Create-dialog").html(data);

        }
    });
    dialog_box();
}


/////////////////////////////////// Solutions /////////////////////////////////////
function loadSolutions() {

    if (page > -2 && !_inCallback) {
        _inCallback = true;
        page++;
        jQuery('div#loading').html('<img src="/Content/img/loading-image.gif" style="width:30px; height:30px;">');
        jQuery.get("/Solutions/SolutionsList?pageNo=" + page , function (data) {
            if (data != '') {
                jQuery("form").unbind("submit");
                jQuery("#SolutionsList").append(data);
            }
            else {
                page = -2;
            }
            _inCallback = false;
            jQuery('div#loading').empty();
        });
    }
    }



function InsertNewSolution() {

    jQuery.ajax({
        url: '/Solutions/Create',
        type: "GET",
        data: {},
        success: function (data) {

            jQuery("#Create-dialog").html(data);

        }
    });
    dialog_box();
}
///////////////////////////////// Features//////////////////////////////////
function loadFeatures(solutionId) {
    if (page > -2 && !_inCallback) {
        _inCallback = true;
        page++;
        jQuery('div#loading').html('<img src="/Content/img/loading-image.gif" style="width:30px; height:30px;">');
        jQuery.get("/Features/FeaturesList?pageNo=" + page + "&solutionId=" + solutionId, function (data) {
            if (data != '') {
                jQuery("form").unbind("submit");
                jQuery("#FeaturesList").append(data);
            }
            else {
                page = -2;
            }
            _inCallback = false;
            jQuery('div#loading').empty();
        });
    }
}

//////////////////////////Users/////////////////
function loadUsers(roleid) {
    if (page > -2 && !_inCallback) {
        _inCallback = true;
        page++;
        jQuery('div#loading').html('<img src="/Content/img/loading-image.gif" style="width:30px; height:30px;">');
        jQuery.get("/Users/UsersList?pageNo=" + page + "&RoleId=" + roleid, function (data) {
            if (data != '') {
                jQuery("form").unbind("submit");
                jQuery("#UsersList").append(data);
            }
            else {
                page = -2;
            }
            _inCallback = false;
            jQuery('div#loading').empty();
        });
    }
}
function InsertNewUser() {

    jQuery.ajax({
        url: '/Users/Create',
        type: "GET",
        data: {},
        success: function (data) {

            jQuery("#Create-dialog").html(data);

        }
    });
    dialog_box();
}
//////////////////////////////Clients ///////////////////
function loadClients() {

    if (page > -2 && !_inCallback) {
        _inCallback = true;
        page++;
        jQuery('div#loading').html('<img src="/Content/img/loading-image.gif" style="width:30px; height:30px;">');
        jQuery.get("/Clients/ClientsList?pageNo=" + page, function (data) {
            if (data != '') {
                jQuery("form").unbind("submit");
                jQuery("#ClientsList").append(data);
            }
            else {
                page = -2;
            }
            _inCallback = false;
            jQuery('div#loading').empty();
        });
    }
}

/////////////////////////////////// Vacancies /////////////////////////////////////
function loadVacancies() {
    if (page > -2 && !_inCallback) {
        _inCallback = true;
        page++;
        jQuery('div#loading').html('<img src="/Content/img/loading-image.gif" style="width:30px; height:30px;">');
        jQuery.get("/Vacancies/VacanciesList?pageNo=" + page, function (data) {
            if (data != '') {
                jQuery("form").unbind("submit");
                jQuery("#VacanciesList").append(data);
            }
            else {
                page = -2;
            }
            _inCallback = false;
            jQuery('div#loading').empty();
        });
    }
}

/////////////////////////////////// Job Requirements /////////////////////////////////////
function loadJobRequirements(vacancyId) {
    if (page > -2 && !_inCallback) {
        _inCallback = true;
        page++;
        jQuery('div#loading').html('<img src="/Content/img/loading-image.gif" style="width:30px; height:30px;">');
        jQuery.get("/JobRequirements/JobRequirementsList?pageNo=" + page + "&vacancyId=" + vacancyId, function (data) {
            if (data != '') {
                jQuery("form").unbind("submit");
                jQuery("#JobRequirementsList").append(data);
            }
            else {
                page = -2;
            }
            _inCallback = false;
            jQuery('div#loading').empty();
        });
    }
}
// Modifed version of Haran's language Selector 
// @author: Zachary Kirby

/* 

 In my personal opion, there is absolutly no reason to use 
 this in the eatup app. The language selector there is fine and 
 works perfectly. This adds no sufficient value or user experinece 
 to the eatup at all. Also this makes requests to a remote server
 and the current system doesn't, making it a lot faster and scalable.

 This is cool, but it requires a lot more work to integrate into the 
 app and really doesn't improve the app in any way.

*/

/* 

Changes that need to be made to integrate to ionic 2: 
1) Finish syntax changes to meet es6 and ts specifications
2) AJAX calls need to be replaced with provider calls -- meaning you need to write a new provider 
3) Languages need to sync with the main DB languages provided 
4) Obviously need to remove all of the jQuery references 
5) Need to add the html in the ionic template to support the removed jQuery componenets 

If you finish all of that, then yes you could put it in the app. Provided that the app
doesn't have to scale ever.

*/

// Languages 
const rtlLangs = new Set([
    "heb",
    "fas",
    "mzn",
    "lrc",
    "uig",
    "kas",
    "urd",
    "fa_AF",
    "ara",
    "yid",
    "ckb",
    "pus",
    "ur_IN",
    "ar_EG",
    "ar_LY",
    "ar_SA",
    "uz_Arab",
    "pa_Arab"
])

// avoid duplicate selectors
let userlangSelector, langnameSelector, countrySelector

function loadLangNames(code) {
    $.ajax("https://kamusi-cls-backend.herokuapp.com/langnames/" + code, {
        success: function (response) {
            var langdata = JSON.parse(response)
            langnameSelector
                .html('')
                .select2('data', null)
            if (langdata[0] && langdata[0].id){
                langnameSelector.select2({
                    data: langdata,
                    dir: rtlLangs.has(code) ? "rtl" : "ltr"
                })
                langnameSelector.children('option[value="'+ code +'"]').prop("selected", "selected")
                langnameSelector.trigger('change')
            }
        },
        error: function (data) {
            loadLangNames("eng") // <- Recusive error handler? Isn't this dangerous? 
        }
    })
}

function loadCountryNames(code){
    $.ajax("https://kamusi-cls-backend.herokuapp.com/territories/" + code, { // Would have to be handled with a provider
        success: function (response) {
            var countryData = JSON.parse(response)
            countrySelector
                .html('')
                .select2('data', null)
            if (countryData[0] && countryData[0].id){
                countrySelector.select2({
                    data: countryData,
                    dir: rtlLangs.has(code) ? "rtl" : "ltr"
                })
                countrySelector.children('option[value="'+ code +'"]').prop("selected", "selected")
                countrySelector.trigger('change')
            }
        },
        error: function (data) {
            loadCountryNames("eng") // <- Recusive error handler? Isn't this dangerous? 
        }
    })
}

var userlangAJAX = {
    url: function (params) {
        return 'https://kamusi-cls-backend.herokuapp.com/userlangs/' + (params.term || "")
    },
    dataType: 'json',
    delay: 10,
    processResults: function (data) {
        var ret = data
        if (data[0] && typeof data[0].text !== "string") {
            ret = []
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].text.length; j++) {
                    ret.push({text: data[i].text[j], id: data[i].id})
                }
            }
        }

        return {results: ret}
    }
}
userlangSelector.select2({
    ajax: userlangAJAX
})
userlangSelector.change(function (e) {
    loadLangNames(userlangSelector.val())
    loadCountryNames(userlangSelector.val())
})
$.ajax("https://kamusi-cls-backend.herokuapp.com/userlangs/", {
    success: function(data){
        var ret = []
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].text.length; j++) {
                ret.push({text: data[i].text[j], id: data[i].id})
            }
        }
        userlangSelector.select2({
            data: ret,
            ajax: userlangAJAX,
            dir: rtlLangs.has(data[0].id) ? "rtl" : "ltr"
        })
        userlangSelector.trigger('change')

        userlangSelector.change(function(){
            userlangSelector.select2({dir: rtlLangs.has(userlangSelector.val()) ? "rtl" : "ltr"})
        })
    },
    error: function(err){
        throw err
    }
})

// initialize langname selector
//langnameSelector = $('#kamusi-langname')
langnameSelector.select2()
//loadLangNames("eng")

// load with default values


// initialize country selector
//countrySelector = $("#kamusi-country")
countrySelector.select2()

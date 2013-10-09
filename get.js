var fs = require('fs'),
    cssmin = require('./node_modules/cssmin/cssmin.js'),
    unless = require('./unless.js'),
    ciment = require('./node_modules/ciment/ciment.js'),
    page = require('webpage').create(),
    url = 'http://docs.emmet.io/cheat-sheet/';
    

page.settings["localToRemoteUrlAccessEnabled"]  = true;

page.open(url, function (status) {
    var emmetBaseObj = page.evaluate(function(unless) {
        var emmetBaseObj = {
            css: '/***\n\n  Replace [":","+"] with ["-","_"]\n\n***/',
            blank: '/***\n\n  Replace [":","+"] with ["-","_"]\n\n***/',
            md: '',
            json: {}
        };
        var subSections = document.querySelectorAll('.ch-section_css .ch-section__content .ch-subsection');
        for (var i = 0; i < subSections.length ; i ++) {
            var subSection = subSections[i],
                sectionTitle = subSection.querySelector('.ch-subsection__title').innerText,
                snippets = subSection.querySelectorAll('.ch-snippet');

            if (sectionTitle == 'Others') {
                continue;
            }
            emmetBaseObj.json[sectionTitle] = [];
            emmetBaseObj.css += '\n\n/****  ' + sectionTitle + '  ****/\n';
            emmetBaseObj.blank += '\n\n/****  ' + sectionTitle + '  ****/\n';
            for (var j = 0, len = snippets.length; j < len; j ++) {
                var snippet = snippets[j],
                    key = snippet.querySelector('.ch-snippet__name').innerText,
                    value = snippet.querySelector('.ch-snippet__value').innerText;

                key = key.replace(':', '-')
                         .replace('+', '_')
                         .replace(',', '')
                         .replace(/\s[a-zA-Z]*/,'');

                value = value.replace('$', '')
                             .replace('{', '')
                             .replace('}', '');

                if (value.match(/:;|\(\)/) || unless.dictionary[key]) {
                    emmetBaseObj.css += '/*.' + key + ' { ' + value + ' }*/\n';
                } else {
                    emmetBaseObj.css += '.' + key + ' { ' + value + ' }\n';
                    emmetBaseObj.blank += '.' + key + ' { ' + value + ' }\n';
                }


            }

        }
        return emmetBaseObj;
    }, unless);
    // var emCtn = JSON.stringify();
    fs.write('dist/emstyle.css', emmetBaseObj.css, 'w');
    fs.write('dist/emstyle.min.css', cssmin(emmetBaseObj.css), 'w');
    fs.write('dist/emstyle.blank.css', emmetBaseObj.blank, 'w');
    console.log('Create file success, Please press Ctrl + C to exit !');
    // fs.write('base.js', emCtn, 'w');
    phantom.exit(1);
});
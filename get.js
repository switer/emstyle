var fs = require('fs'),
    page = require('webpage').create(),
    url = 'http://docs.emmet.io/cheat-sheet/';
    

page.settings["localToRemoteUrlAccessEnabled"]  = true;

page.open(url, function (status) {
    var emmetBaseObj = page.evaluate(function() {
        var emmetBaseObj = {
            css: '/***\n\n  Replace [":","+"] with ["-","_"]\n\n***/',
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
            for (var j = 0, len = snippets.length; j < len; j ++) {
                var snippet = snippets[j],
                    key = snippet.querySelector('.ch-snippet__name').innerText,
                    value = snippet.querySelector('.ch-snippet__value').innerText;

                emmetBaseObj.json[sectionTitle].push({
                    key: key,
                    value: value
                });
                emmetBaseObj.css += '.' + key.replace(':', '-').replace('+', '_').replace(',', '').replace(/\s[a-zA-Z]*/,'')
                                        + ' { ' + value + ' }\n';
            }

        }
        return emmetBaseObj;
    });
    // var emCtn = JSON.stringify();
    fs.write('base.emmet.css', emmetBaseObj.css, 'w');
    console.log('Create file success, Please press Ctrl + C to exit !');
    // fs.write('base.js', emCtn, 'w');
    phantom.exit();
});
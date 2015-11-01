window.stemmerDict = {};
window.buttonArray = [];
window.tags = {};
var stop_words = new Array(
    'a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'among', 'an', 'and', 'another', 'any', 'anybody', 'anyone', 'anything', 'anywhere', 'are', 'area', 'areas', 'around', 'as', 'ask', 'asked', 'asking', 'asks', 'at', 'away', 'b', 'back', 'backed', 'backing', 'backs', 'be', 'became', 'because', 'become', 'becomes', 'been', 'before', 'began', 'behind', 'being', 'beings', 'best', 'better', 'between', 'big', 'both', 'but', 'by', 'c', 'came', 'can', 'cannot', 'case', 'cases', 'certain', 'certainly', 'clear', 'clearly', 'come', 'could', 'd', 'did', 'differ', 'different', 'differently', 'do', 'does', 'done', 'down', 'down', 'downed', 'downing', 'downs', 'during', 'e', 'each', 'early','eg','either', 'end', 'ended', 'ending', 'ends', 'enough', 'even', 'evenly', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'f', 'face', 'faces', 'fact', 'facts', 'far', 'felt', 'few', 'find', 'finds', 'first', 'for', 'four', 'from', 'full', 'fully', 'further', 'furthered', 'furthering', 'furthers', 'g', 'gave', 'general', 'generally', 'get', 'gets', 'give', 'given', 'gives', 'go', 'going', 'good', 'goods', 'got', 'great', 'greater', 'greatest', 'group', 'grouped', 'grouping', 'groups', 'h', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'herself', 'high', 'high', 'high', 'higher', 'highest', 'him', 'himself', 'his', 'how', 'however', 'i', 'if', 'important', 'in', 'interest', 'interested', 'interesting', 'interests', 'into', 'is', 'it', 'its', 'itself', 'j', 'just', 'k', 'keep', 'keeps', 'kind', 'knew', 'know', 'known', 'knows', 'l', 'large', 'largely', 'last', 'later', 'latest', 'least', 'less', 'let', 'lets', 'like', 'likely', 'long', 'longer', 'longest', 'm', 'made', 'make', 'making', 'man', 'many', 'may', 'me', 'member', 'members', 'men', 'might', 'more', 'most', 'mostly', 'mr', 'mrs', 'much', 'must', 'my', 'myself', 'n', 'necessary', 'need', 'needed', 'needing', 'needs', 'never', 'new', 'new', 'newer', 'newest', 'next', 'no', 'nobody', 'non', 'noone', 'not', 'nothing', 'now', 'nowhere', 'number', 'numbers', 'o', 'of', 'off', 'often', 'old', 'older', 'oldest', 'on', 'once', 'one', 'only', 'open', 'opened', 'opening', 'opens', 'or', 'order', 'ordered', 'ordering', 'orders', 'other', 'others', 'our', 'out', 'over', 'p', 'part', 'parted', 'parting', 'parts', 'per', 'perhaps', 'place', 'places', 'point', 'pointed', 'pointing', 'points', 'possible', 'present', 'presented', 'presenting', 'presents', 'problem', 'problems', 'put', 'puts', 'q', 'quite', 'r', 'rather', 'really', 'right', 'right', 'room', 'rooms', 's', 'said', 'same', 'saw', 'say', 'says', 'second', 'seconds', 'see', 'seem', 'seemed', 'seeming', 'seems', 'sees', 'several', 'shall', 'she', 'should', 'show', 'showed', 'showing', 'shows', 'side', 'sides', 'since', 'small', 'smaller', 'smallest', 'so', 'some', 'somebody', 'someone', 'something', 'somewhere', 'state', 'states', 'still', 'still', 'such', 'sure', 't', 'take', 'taken', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'therefore', 'these', 'they', 'thing', 'things', 'think', 'thinks', 'this', 'those', 'though', 'thought', 'thoughts', 'three', 'through', 'thus', 'to', 'today', 'together', 'too', 'took', 'toward', 'turn', 'turned', 'turning', 'turns', 'two', 'u', 'under', 'until', 'up', 'upon', 'us', 'use', 'used', 'uses', 'v', 'very', 'w', 'want', 'wanted', 'wanting', 'wants', 'was', 'way', 'ways', 'we', 'well', 'wells', 'went', 'were', 'what', 'when', 'where', 'whether', 'which', 'while', 'who', 'whole', 'whose', 'why', 'will', 'with', 'within', 'without', 'work', 'worked', 'working', 'works', 'would', 'x', 'y', 'year', 'years', 'yet', 'you', 'young', 'younger', 'youngest', 'your', 'yours', 'z', '-----', 'don\'t', 'can\'t', 'it\'s','i\'m','+','doesn\'t'
    );

window.collapseAll = function () {
    var currLinkText = document.getElementById('btnCollapseAll').innerHTML;
    window.allCollapsed = currLinkText.indexOf('Collapse') > -1;
    window.mainButtonClicked = true;
    $.each(window.buttonArray, function(index, val) {
        val.click();
    });
    if (window.allCollapsed) {
        document.getElementById('btnCollapseAll').innerHTML = 'Expand All';
    } else {
        document.getElementById('btnCollapseAll').innerHTML = 'Collapse All';
    }
    window.mainButtonClicked = false;
    toggleHighlights();
}

window.toggleHighlights = function() {
    var checked = document.getElementById('cbxHighlight').checked;
    if (checked) {
        window.allHighlighted = true;
        $(".rounded-blue").css("background-color", "#0088CC");
        $(".rounded-orange").css("background-color", "#F89406");
        $(".rounded-green").css("background-color", "#51A351");
        $(".rounded-red").css("background-color", "#BD362F");
        $(".rounded-blue").css("color", "white");
        $(".rounded-orange").css("color", "white");
        $(".rounded-green").css("color", "white");
        $(".rounded-red").css("color", "white");
    } else {
        window.allHighlighted = false;
        $(".rounded-blue").css("background-color", "transparent");
        $(".rounded-orange").css("background-color", "transparent");
        $(".rounded-green").css("background-color", "transparent");
        $(".rounded-red").css("background-color", "transparent");
        $(".rounded-blue").css("color", "black");
        $(".rounded-orange").css("color", "black");
        $(".rounded-green").css("color", "black");
        $(".rounded-red").css("color", "black");
    }
}

function getIndent(comment) {
    if (comment.length == 0) return -1;
    return parseInt(comment.find('td>table>tbody>tr>td:eq(0)>img').attr('width'), 10);
}
$(function () {
    window.pageType = null;
    var subtext = $('td.subtext');
    if (subtext.length > 0) {
        $(subtext).append(' | ');
        $(subtext).append('<button type="button" id="btnCollapseAll">Collapse All</button>');
        $(subtext).append(' | ');
        $(subtext).append('<input type="checkbox" id="cbxHighlight" checked="checked">Show Highlights</input>');
        window.pageType = 'main';
    } else {
        var top = $('span.comhead')[0];
        $(top).append(' | ');
        $(top).append('<button type="button" id="btnCollapseAll">Collapse All</button>');
        $(top).append(' | ');
        $(top).append('<input type="checkbox" id="cbxHighlight" checked="checked">Show Highlights</input>');
        window.pageType = 'comment';
    }
    window.allHighlighted = true;
    document.getElementById("btnCollapseAll").addEventListener("click", collapseAll, false);
    document.getElementById("cbxHighlight").addEventListener("change", toggleHighlights, false);
	// comments page
	var commentRowIndex = 2;

	// Sometimes Hacker News adds a black line of mourning when someone
	// important for the HN community passes away. This breaks the selector
	// so we need to check if it's in place.
	if ($('body>center>table>tbody>tr:eq(0)>td').attr('bgcolor') === '#000000')
	{
		commentRowIndex = 3;
	}

	var selector = $('body>center>table>tbody>tr:eq(' + commentRowIndex +
		')>td>table:eq(1)>tbody>tr>td>table>tbody>tr>td.default>div>span.comhead');
	
	// if the comments page selector doesn't work,let's check if the threads page selector works
	if (selector.length == 0)
		selector = $('body>center>table>tbody>tr>td>table>tbody>tr>td.default>div>span.comhead');

	selector
		.each(function(idx, val)
		{
			var _this = $(this);
			var button = 
				$('<a></a>')
				.attr('href', '#')
				.text('[-]')
            .addClass('linkButton')
		    ;
		    var collapsedText = $('<span></span>').text('');
			
			
			var isDeleted = false;
			var collapsedComments = null;	
			var isCollapsed = false;
			var thisCommentIndent = getIndent(_this.parent().parent().parent().parent().parent().parent().parent());
            if (thisCommentIndent === 0) {
                window.buttonArray.push(button);
            }
			button.click(function() {
			    var expandThis = (window.mainButtonClicked && !window.allCollapsed) || (!window.mainButtonClicked && isCollapsed);
			    var collapseThis = (window.mainButtonClicked && window.allCollapsed) || (!window.mainButtonClicked && !isCollapsed);
			    if (expandThis)
				{
					for (var i = 0; i < collapsedComments.length; i++)
					{
						collapsedComments[i].show();
					}
					button.text('[-]');
				    collapsedText.text('');
					isCollapsed = false;
                    if(window.mainButtonClicked) collapsedComments = null;
				}
			    else if (collapseThis) {
			        var thisComment = _this.parent().parent().parent().parent().parent().parent().parent();
					if (collapsedComments == null)
					{
						var thisIndent = getIndent(thisComment);
						collapsedComments = [_this.parent().parent().children('span.comment')];
						if (collapsedComments[0].next('p').length == 1)
						{
							collapsedComments.push(collapsedComments[0].next('p'));
						}
						
						var cursor = thisComment;
						while (getIndent(cursor = cursor.next()) > thisIndent)
						{
							collapsedComments.push(cursor);
							var next = cursor.next('p');
							if (next.length == 1) collapsedComments.push(next);
						}
					}
					var currText = '';
					if (thisComment) currText = thisComment.find('.comment').text();
				    var allInnerText = '';
				    if(thisComment) allInnerText = thisComment.find('.comment').text();
				    for (var i = 0; i < collapsedComments.length; i++) {
				        var textInFont = $(collapsedComments[i]).find('.comment').text();
					    allInnerText += textInFont.slice(0,textInFont.lastIndexOf('reply'));
					    collapsedComments[i].hide();
				    }
				    var tagCloudString = '';
				    var splitted = allInnerText.split(/\s+/);
				    
				    var currDict = {};
				    var dict = {};
				    $.each(splitted, function (key, value) {
				        value = removeLastChar(value);
				        value = removeFirstChar(value);
				        var length = value.length;
                        if (value[length - 1] === 's' && value[length - 2] === '\'') {
                            value = value.substring(0, length - 2);
                        }
				        var stemmed = stemmer(value);
				        if (window.stemmerDict.hasOwnProperty(stemmed)) {
				            value = window.stemmerDict[stemmed];
				        } else {
				            window.stemmerDict[stemmed] = value;
				        }
				        var allDashes = /^(.)\1+$/.test('-');
				        if ($.inArray(value.toLowerCase(), stop_words) === -1 &&!allDashes) {
                            if (dict.hasOwnProperty(value)) {
                                dict[value] += 1;
                            } else {
                                dict[value] = 1;
                            }
                        }
				    });
				    var sortable = [];
                    for (var item in dict) {
                        sortable.push([item, dict[item]]);
                    }
                    sortable.sort(function (a, b) { return b[1] - a[1] });
				    sortable = sortable.slice(0, 15);
				    shuffle(sortable);
				    var maxHeightPercent = 100;
				    tagCloudString += '[';
				    
				    $.each(sortable, function (index, item) {
				        var value = item[1];
				        if (value > 1) {
				            var countVal = value;
				            var classLabel = 'rounded-blue';
				            if (countVal >= 2 && countVal < 5) classLabel = 'rounded-blue';
				            if (countVal >= 6 && countVal <= 10) classLabel = 'rounded-green';
				            if (countVal >= 11 && countVal <= 15) classLabel = 'rounded-orange';
				            if (countVal >= 16) classLabel = 'rounded-red';
                            if(item[0]!=='' && countVal >=6) tagCloudString += ' <span class="' + classLabel + '">' + item[0] + ' <span class="label label-as-badge">'+countVal+'</span> </span>&nbsp;';
				        }
				    });
				    tagCloudString += ']';
			        currText = replaceAll(currText,'? ','?.');
				    var currSentences = currText.split('.');
				    var bestSentence = currSentences[0];
				    var bestAvg = -1;
				    $.each(currSentences, function(index, item) {
				        var currSentenceSplitted = item.split(/\s+/);
                        if (currSentenceSplitted.length > 5) {
                            var avg = 0.0;
                            var totalScore = 0;
                            var numWords = 0;
                            $.each(currSentenceSplitted, function (key, value) {
                                var actualVal = value;
                                value = removeLastChar(value);
                                value = removeFirstChar(value);
                                var length = value.length;
                                if (value[length - 1] === 's' && value[length - 2] === '\'') {
                                    value = value.substring(0, length - 2);
                                }
                                var stemmed = stemmer(value);
                                if (window.stemmerDict.hasOwnProperty(stemmed)) {
                                    value = window.stemmerDict[stemmed];
                                } else {
                                    window.stemmerDict[stemmed] = value;
                                }
                                var wordHighlightMin = 6;
                                if (window.pageType === 'main') wordHighlightMin = 6;
                                if (window.pageType === 'comment') wordHighlightMin = 3;
                                if (dict.hasOwnProperty(value)) {
                                    if ($.inArray(actualVal.toLowerCase(), stop_words) === -1) totalScore += dict[value];
                                    var countVal = dict[value];
                                    var classLabel = 'rounded-blue';
                                    if (countVal >= 3 && countVal < 5) classLabel = 'rounded-blue';
                                    if (countVal >= 6 && countVal < 10) classLabel = 'rounded-green';
                                    if (countVal >= 10 && countVal < 15) classLabel = 'rounded-orange';
                                    if (countVal >= 15) classLabel = 'rounded-red';
                                    if (countVal >= wordHighlightMin && actualVal.length>1) {
                                        item = item.replace(actualVal, '<span class="' + classLabel + '">' + actualVal + '</span>');
                                    }
                                }
                                numWords += 1;
                            });
                            avg = totalScore * 1.0 / numWords;
                            if (avg > bestAvg) {
                                bestAvg = avg;
                                bestSentence = item;
                                if (index === (currSentences.length-1)) {
                                    if (bestSentence.trimRight().endsWith('reply')) {
                                        bestSentence = bestSentence.trimRight().replace(new RegExp('reply$'), '');
                                    }
                                }
                            }
                        }
				    });
				    var greenHighlightMin = (window.pageType === 'main')?10:2;
				    var orangeHighlightMin = (window.pageType === 'main') ? 20 : 5;
				    var redHighlightMin = (window.pageType === 'main') ? 30 : 10;
			        var blueHighlighMin = (window.pageType === 'main') ? 40 : 15;

			        var commentClassLabel = 'rounded-gray';
			        if (collapsedComments.length >= greenHighlightMin) commentClassLabel = 'rounded-green';
			        if (collapsedComments.length >= orangeHighlightMin) commentClassLabel = 'rounded-orange';
			        if (collapsedComments.length >= redHighlightMin) commentClassLabel = 'rounded-red';
			        if (collapsedComments.length >= blueHighlighMin) commentClassLabel = 'rounded-blue';
                    var tagCloudHtml = '<span style="display: inline-block;height:' + maxHeightPercent + '%;border-radius: 3px;background:#ff6600;color:#000000">' + tagCloudString + '</span><br/>';
				    button.html('[+]');
				    collapsedText.html(' | <span class="' + commentClassLabel + '">' + collapsedComments.length + ' comments</span><br/><span class="htext">' + bestSentence + '</span><br/>');
					if (isDeleted)
					{
						_this.parent().next().show();
					}

					isCollapsed = true;
				}
			    
				return false;
			});
			
			// test for deleted comments
			if (_this.parent().next('br').length === 1)
			{
				_this.append(' | ');
				_this.append(button);
			    _this.append(collapsedText);
			}
			else
			{
				isDeleted = true;
				button.css('color', '#828282').css('text-decoration', 'none').css('font-size', '9pt');
				_this.parent().next().append($('<span></span>').text(' '));
				_this.parent().next().after(button);
			}
		});
});

function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function removeLastChar(word) {
    var chars = ['\'', '"', '.', ',','?',')'];
    var lastChar = word.substring(word.length - 1);
    if ($.inArray(lastChar,chars)>-1)
    {
        word = word.substring(0, word.length-1);
    }
    return word;
}

function removeFirstChar(word) {
    var chars = ['\'', '"','('];
    var firstChar = word.charAt(0);
    if ($.inArray(firstChar, chars) > -1) {
        word = word.substring(1);
    }
    return word;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var stemmer = function () {
    function i() { } function j() { console.log(Array.prototype.slice.call(arguments).join(" ")) } var k = { ational: "ate", tional: "tion", enci: "ence", anci: "ance", izer: "ize", bli: "ble", alli: "al", entli: "ent", eli: "e", ousli: "ous", ization: "ize", ation: "ate", ator: "ate", alism: "al", iveness: "ive", fulness: "ful", ousness: "ous", aliti: "al", iviti: "ive", biliti: "ble", logi: "log" }, l = { icate: "ic", ative: "", alize: "al", iciti: "ic", ical: "ic", ful: "", ness: "" }; return function (a, m) {
        var d, c, g, b, h, e, f = a; e = m ? j : i; if (3 > a.length) return a;
        g = a.substr(0, 1); "y" == g && (a = g.toUpperCase() + a.substr(1)); b = /^(.+?)(ss|i)es$/; c = /^(.+?)([^s])s$/; b.test(a) ? (a = a.replace(b, "$1$2"), e("1a", b, a)) : c.test(a) && (a = a.replace(c, "$1$2"), e("1a", c, a)); b = /^(.+?)eed$/; c = /^(.+?)(ed|ing)$/; b.test(a) ? (c = b.exec(a), b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, b.test(c[1]) && (b = /.$/, a = a.replace(b, ""), e("1b", b, a))) : c.test(a) && (c = c.exec(a), d = c[1], c = /^([^aeiou][^aeiouy]*)?[aeiouy]/, c.test(d) && (a = d, e("1b", c, a), c = /(at|bl|iz)$/, h = /([^aeiouylsz])\1$/, d = /^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/,
        c.test(a) ? (a += "e", e("1b", c, a)) : h.test(a) ? (b = /.$/, a = a.replace(b, ""), e("1b", h, a)) : d.test(a) && (a += "e", e("1b", d, a)))); b = /^(.*[aeiouy].*)y$/; b.test(a) && (c = b.exec(a), d = c[1], a = d + "i", e("1c", b, a)); b = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/; b.test(a) && (c = b.exec(a), d = c[1], c = c[2], b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, b.test(d) && (a = d + k[c], e("2", b, a))); b = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
        b.test(a) && (c = b.exec(a), d = c[1], c = c[2], b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, b.test(d) && (a = d + l[c], e("3", b, a))); b = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/; c = /^(.+?)(s|t)(ion)$/; b.test(a) ? (c = b.exec(a), d = c[1], b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, b.test(d) && (a = d, e("4", b, a))) : c.test(a) && (c = c.exec(a), d = c[1] + c[2], c = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,
        c.test(d) && (a = d, e("4", c, a))); b = /^(.+?)e$/; if (b.test(a) && (c = b.exec(a), d = c[1], b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, c = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$/, h = /^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/, b.test(d) || c.test(d) && !h.test(d))) a = d, e("5", b, c, h, a); b = /ll$/; c = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/; b.test(a) && c.test(a) && (b = /.$/, a = a.replace(b, ""), e("5",
        b, c, a)); "y" == g && (a = g.toLowerCase() + a.substr(1)); g = { skis: "ski", skies: "sky", dying: "die", lying: "lie", tying: "tie", idly: "idl", gently: "gentl", ugly: "ugli", early: "earli", only: "onli", singly: "singl" }; g[f] !== {}[f] && (a = g[f], e("Special Word", a)); -1 !== "sky news howe atlas cosmos bias          andes inning outing canning herring          earring proceed exceed succeed".indexOf(f) && (a = f, e("Special Word", a)); b = /.*generate?s?d?(ing)?$/; b.test(f) && (a += "at", e("Overstemmed", a)); b = /.*general(ly)?$/; b.test(f) && (a += "al",
        e("Overstemmed", a)); b = /.*generic(ally)?$/; b.test(f) && (a += "ic", e("Overstemmed", a)); b = /.*generous(ly)?$/; b.test(f) && (a += "ous", e("Overstemmed", a)); b = /.*communit(ies)?y?/; b.test(f) && (a += "iti", e("Overstemmed", a)); return a
    }
}();
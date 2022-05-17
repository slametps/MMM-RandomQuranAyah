/* Magic Mirror
 * Node Helper: MMM-RandomQuranAyah
 *
 * By Slamet PS/slametps@gmail.com
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');
var async = require('async');

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		console.log("Starting node_helper.js for MMM-RandomQuranAyah.");
	},

	socketNotificationReceived: function(notification, payload) {
		console.log(this.name + " node helper received a socket notification: " + notification + " - Payload: " + payload);
    //console.log(this.name + "/nodehelper/lang=" + payload.translationLang);
		this.quranRandomRequest(payload);
	},

	quranRandomRequest: function(payload) {
    //console.log(this.name + "/nodehelper/quranRandomRequest-" + payload.translationLang);
		var self = this;
    var randomAyah = self.getRandomAyah(1, 6236);
    var quranArabicURL = "http://api.alquran.cloud/v1/ayah/" + randomAyah + "/editions/ar";
    var quranTranslationURL = "http://api.alquran.cloud/v1/ayah/" + randomAyah + "/editions/" + payload.translationLang;
    //console.log(this.name + "/nodehelper/URL1-"+quranArabicURL);
    //console.log(this.name + "/nodehelper/URL2-"+quranTranslationURL);

    var textArabic = "";
    var textTranslation = "";
    var surahNameArabic = "";
    var surahNameEnglish = ""; // in english
    var surahNameEnglishTranslation = ""; // in english
    var surahNumber = 1;
    var ayahNumberInSurah = 1;
    var numberOfAyahs = 1;
    var juzNumber = 1;

    async.parallel({
      arabic: function (callback) {
        request({ url: quranArabicURL, method: 'GET' }, function(error, response, body) {
          console.log("/nodehelper/get arabic with statuscode-" + response.statusCode);
          callback(error, body);
        });
      },
      translation: function (callback) {
        request({ url: quranTranslationURL, method: 'GET' }, function(error, response, body) {
          console.log("/nodehelper/get translation with statuscode-" + response.statusCode);
          callback(error, body);
        });
      }
    }, function (error, result) {
      if (error) {
        // Somewhere, something went wrong…
        console.log("/nodehelper/error while processing requests-" + error);
      }

      //console.log("/nodehelper/result.arabic-" + result.arabic);
      //console.log("/nodehelper/result.translation-" + result.translation);
      var resultArabic = JSON.parse(result.arabic),
          resultTranslation = JSON.parse(result.translation);

      // Merge results
      if (resultArabic && resultArabic.data[0]) {
        textArabic = resultArabic.data[0].text;
        surahNameArabic = resultArabic.data[0].surah.name;
        surahNameEnglish = resultArabic.data[0].surah.englishName; // in english
        surahNameEnglishTranslation = resultArabic.data[0].surah.englishNameTranslation; // in english
        surahNumber = resultArabic.data[0].surah.number;
        ayahNumberInSurah = resultArabic.data[0].numberInSurah;
        numberOfAyahs = resultArabic.data[0].surah.numberOfAyahs;
        juzNumber = resultArabic.data[0].juz;
      }
      if (resultTranslation && resultTranslation.data[0]) {
        textTranslation = resultTranslation.data[0].text;
      }

      var result = {refNumber: randomAyah, arabic: textArabic, translation: textTranslation, surahNameArabic: surahNameArabic, surahNameEnglish: surahNameEnglish, surahNameEnglishTranslation: surahNameEnglishTranslation, surahNumber: surahNumber, ayahNumberInSurah: ayahNumberInSurah, numberOfAyahs: numberOfAyahs, juzNumber: juzNumber};
      console.log("/nodehelper/result-"+result.surahNameEnglish+":"+result.ayahNumberInSurah);

      self.sendSocketNotification('QURAN_RANDOM_RESULT', result);
    });
	},

  getRandomAyah: function(min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    //console.log(this.name + "/nodehelper/random-" + randomNumber);
    return randomNumber;
  }
});

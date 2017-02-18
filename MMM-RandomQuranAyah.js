Module.register("MMM-RandomQuranAyah",{
	// Default module config.
	defaults: {
		apiVersion: '1.0',
    showArabic: false,
    showTranslation: true,
    surahArabicName: false,
    translationLang: 'en.yusufali', // translation language (full-option at http://api.alquran.cloud/edition)
    updateInterval: 3600 * 1000, // How often do you want to fetch and display new ayah? (milliseconds)
    animationSpeed: 2.5 * 1000, // Speed of the update animation. (Milliseconds)
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;

		// do this once first
		self.sendSocketNotification('START_QURAN', self.config);

		// then every interval
		setInterval(function() {
      //console.log("before send socketNotification - " + this.config.translationLang);
      self.sendSocketNotification('START_QURAN', self.config);
    }, this.config.updateInterval);
	},

	// Override dom generator.
	getDom: function() {
		Log.log("Updating MMM-RandomQuranAyah DOM.");
    var self = this;
    var arabic = "";
    var translation = "";
    var ayahNumberInSurah = "";
    var surahNameArabic = "";
    var surahNameEnglish = "";

    if (this.arabic != null && this.translation != null && this.ayahNumberInSurah != null &&
        this.surahNameArabic != null && this.surahNameEnglish != null) {
      arabic = this.arabic;
      translation = this.translation;
      ayahNumberInSurah = this.ayahNumberInSurah;
      surahNameArabic = this.surahNameArabic;
      surahNameEnglish = this.surahNameEnglish;
    }

    var wrapper = document.createElement("div");

    if (self.config.showArabic)
    {
      var txtArabic = document.createElement("div");
      txtArabic.className = "bright medium light";
      txtArabic.innerHTML = arabic;
      wrapper.appendChild(txtArabic);
    }

		var txtTranslation = document.createElement("div");
		txtTranslation.className = "bright small light";
    var htmlRef = "";
    if (self.config.surahArabicName) {
      htmlRef = surahNameArabic + ":" + ayahNumberInSurah;
    }
    else {
      htmlRef = "QS. " + surahNameEnglish + ":" + ayahNumberInSurah;
    }
    if (self.config.showTranslation){
		  txtTranslation.innerHTML = translation + " (" + htmlRef + ")";
    }
    else {
      txtTranslation.innerHTML = "(" + htmlRef + ")";
    }
    wrapper.appendChild(txtTranslation);

		return wrapper;
  },

	getScripts: function() {
	    return [
	        this.file('js/jquery-3.1.1.min.js'), // this file will be loaded straight from the module folder.
	    ]
	},

	socketNotificationReceived: function(notification, payload) {
		Log.log("socket received from Node Helper");
    var self = this;
		if (notification == "QURAN_RANDOM_RESULT"){
			var json = payload;
			Log.log(payload);
			console.log("socketNotificationReceived [" + payload + "]");
      this.arabic = json.arabic;
      this.translation = json.translation;
      this.ayahNumberInSurah = json.ayahNumberInSurah;
      this.surahNameArabic = json.surahNameArabic;
      this.surahNameEnglish = json.surahNameEnglish;

			this.updateDom(self.config.animationSpeed);
		}
	}
});

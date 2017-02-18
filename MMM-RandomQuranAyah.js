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
		self.sendSocketNotification('START', self.config);

		// then every interval
		setInterval(function() {
      //console.log("before send socketNotification - " + this.config.translationLang);
      self.sendSocketNotification('START', self.config);
    }, this.config.updateInterval);
	},

	// Override dom generator.
	getDom: function() {
		Log.log("Updating MMM-RandomQuranAyah DOM.");
    var self = this;

    var wrapper = document.createElement("div");

    if (self.config.showArabic)
    {
      var txtArabic = document.createElement("div");
      txtArabic.className = "bright medium light";
      txtArabic.innerHTML = this.result.arabic;
      wrapper.appendChild(txtArabic);
    }

		var txtTranslation = document.createElement("div");
		txtTranslation.className = "bright small light";
    var htmlRef = "";
    if (self.config.surahArabicName) {
      htmlRef = this.result.surahNameArabic + ":" + this.result.ayahNumberInSurah;
    }
    else {
      htmlRef = "QS. " + this.result.surahNameEnglish + ":" + this.result.ayahNumberInSurah;
    }
    if (self.config.showTranslation){
		  txtTranslation.innerHTML = this.result.translation + " (" + htmlRef + ")";
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
		if(notification == "QURAN_RANDOM_RESULT"){
			var json = payload;
			Log.log(payload);
			console.log("socketNotificationReceived [" + payload + "]");
			/*this.ayahArabicRandom = json.content.arabic;
      this.ayahTranslation = json.content.translation;
			this.surah = json.content.surah_translation;
      this.ayahId = json.content.ayah;*/
      this.result = payload;

			this.updateDom(self.config.animationSpeed);
		}
	}
});

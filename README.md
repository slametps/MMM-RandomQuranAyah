# MMM-RandomQuranAyah
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It will display Quran's ayah (verse) randomly from http://api.alquran.cloud. You can display whether arabic, translation, or both. All translation options can be found at http://api.alquran.cloud/edition.

## Version
1.1
* get and display current displayed Qur'an ayah/verse in telegram (requires [MMM-TelegramBot](https://github.com/eouia/MMM-TelegramBot)) by typing command ````/quranverse````

1.0
* initial release

## Screenshot
![Screenshot](https://raw.githubusercontent.com/slametps/MMM-RandomQuranAyah/master/screenshot.png)

## Installation
1. Navigate into your MagicMirror's `modules` folder
2. execute `git clone https://github.com/slametps/MMM-RandomQuranAyah.git`
3. if this module does not run correctlt, try `npm install async`

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-RandomQuranAyah',
		position: 'top_bar',	// This can be any of the regions. Best result is in the top_bar/bottom_bar as ayah (verse) can take multiple lines.
		config: {
			apiVersion: '1.0', // please, leave unchanged. reserved for future use.
			showArabic: true,
			showTranslation: true,
			surahArabicName:false,
			translationLang:'id.indonesian',
			updateInterval: 3600 * 1000, // milliseconds
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>apiVersion</code></td>
			<td>1.0 (reserved for future use)</td>
		</tr>
		<tr>
			<td><code>showArabic</code></td>
			<td>display arabic?
				<br><b>Possible values:</b><code>true</code>/<code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>showTranslation</code></td>
			<td>display translation?
				<br><b>Possible values:</b><code>true</code>/<code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>surahArabicName</code></td>
			<td>display Surah name in Arabic?
				<br><b>Possible values:</b><code>true</code>/<code>false</code>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
		<tr>
			<td><code>translationLang</code></td>
			<td>List of the supported translation: http://api.alquran.cloud/edition
				<br><b>Default value:</b> <code>en.yusufali</code>
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How ofter to get new ayah/verse? (milliseconds)
				<br><b>Default value:</b> <code>600000</code> (10 minutes)
			</td>
		</tr>
		<tr>
			<td><code>animationSpeed</code></td>
			<td>Speed of the update animation. (Milliseconds)<br>
				<br><b>Possible values:</b><code>0</code> - <code>5000</code>
				<br><b>Default value:</b> <code>2500</code> (2.5 seconds)
			</td>
		</tr>
	</tbody>
</table>

## Dependencies
- Access to the internet to download ayah (verse) from http://api.alquran.cloud

The MIT License (MIT)
=====================

Copyright © 2016-2017 Arthur Garza

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**

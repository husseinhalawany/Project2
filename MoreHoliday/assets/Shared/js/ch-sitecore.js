/* 
 * ---------------------------------------- *
 * Name: 	Sitecore                        *
 * Type: 	JavaScript Class                *
 * Version: v1.0.0                          *
 * Author:	Matt O'Neill                    *
 * Status:	Release                         *
 * ---------------------------------------- *
 */

var chSitecore = { constr: function (e) { e._modeDetect() }, pageEditor: false, preview: false, live: false, _modeDetect: function () { try { if (Sitecore.PageModes !== undefined) { this.pageEditor = true } else { this.preview = true } } catch (e) { this.live = true } } }

chSitecore.constr(chSitecore);

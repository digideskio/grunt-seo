module.exports = function (grunt){
	grunt.loadNpmTasks('grunt-html-snapshot');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.initConfig({
		htmlSnapshot: {
			dist: {
				options: {
					snapshotPath: 'parse/cloud/views/snapshotsTest/',
					sitePath: 'http://www.mahaska.com/',
					fileNamePrefix: '',
					msWaitForPages: 3000,
					removeScripts: true,
					sanitize: function (requestUri) {
						if (/#!\/$/.test(requestUri)) {
							return 'index';
						} else {
							return requestUri.replace(/#!\//, '');
						}
					},
					urls: [
						'#!/',
						'#!/about'
					]
				}
			}
		}
		,copy: {
			htmlSnapshot: {
				files: [
					{
						expand: true,
						cwd: 'parse/cloud/views/snapshotsTest/', 
						src: ['**/*.html'], 
						dest: 'parse/cloud/views/snapshotsTest/', 
						rename: function(dest, src) {
							return dest + src.match(/^.*\./)[0] + 'ejs';
						}
					}
				]
			}
		}
	});
	grunt.registerTask('snap', ['htmlSnapshot:dist', 'copy:htmlSnapshot']);
};
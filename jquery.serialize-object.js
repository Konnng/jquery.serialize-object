/**
 * jquery.serialize-object.js
 * This plugin takes form data and serializes it in object like notation. Since jQuery does not have a native method for that (only serialize as string).
 * This plugin is based on http://stackoverflow.com/a/8407771/390946
 *
 * @copyright CC-BY-SA Konnng.com
 * @author Julio Vedovatto <julio@konnng.com>
 */
;(function($){

	'use strict';

    $.fn.serializeObject = function(){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                'validate': /^[a-z][a-z0-9_\-]*(?:\[(?:\d*|[a-z0-9_\-]+)\])*$/i,
                'key':      /[a-z0-9_\-]+|(?=\[\])/ig,
                'push':     /^$/,
                'fixed':    /^\d+$/,
                'named':    /^[a-z0-9_\-]+$/i
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined)
                push_counters[key] = 0;

            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){
            if(!patterns.validate.test(this.name))
                return;

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;


            while((k = keys.pop()) !== undefined){
				reverse_key = reverse_key.replace(new RegExp('\\[' + k + '\\]$'), '');

				switch (true) {
					case k.match(patterns.push):
						merge = self.build([], self.push_counter(reverse_key), merge);
						break;
					case k.match(patterns.fixed):
						merge = self.build([], k, merge);
						break;
					case k.match(patterns.named):
						merge = self.build({}, k, merge);
						break;
					default:
				}
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };

})(jQuery);

window.Screens = ((window, document, location) => {
    function comparator_entries([key_a], [key_b]) {
        key_a = key_a.toLowerCase();
        key_b = key_b.toLowerCase();

        if (key_a >= key_b) return 1;
        else if (key_b >= key_a) return -1;

        return 0;
    }

    function from_entries(entries = []) {
        return entries.reduce((accum, entry) => {
            if (entry) {
                const [key, value] = entry;
                accum[key] = value;
            }

            return accum;
        }, {});
    }

    function get_params(names = []) {
        const params = new URLSearchParams(location.search);

        names = names.map((key) => {
            if (params.has(key)) {
                let value = params.get(key);
                if (!value) value = true;

                return [key, value];
            }

            return null;
        });

        return from_entries(names);
    }

    function format_params(params = {}) {
        let entries = Object.entries(params);
        if (entries.length < 1) return "";

        entries.sort(comparator_entries);

        entries = entries.filter(([key, value]) => !!value);
        entries = entries.map(([key, value]) => {
            if (value === true) return key;
            return key + "=" + value;
        });

        return "?" + entries.join("&");
    }

    function format_preview_url(path) {
        return "./~/" + path;
    }

    function format_screen_url(path) {
        return "https://novacbn.github.io/stream-screens/~/" + path;
    }

    return {format_params, format_preview_url, format_screen_url, get_params};
})(window, document, location);

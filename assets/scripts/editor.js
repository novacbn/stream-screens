window.Editor = ((window, document) => {
    function make_editor(identifier) {
        const anchor_element = document.querySelector("#" + identifier);
        const code_element = document.querySelector("#" + identifier + "-code");
        const iframe_element = document.querySelector("#" + identifier + "-iframe");

        const subtitle_element = document.querySelector("#" + identifier + "-subtitle");
        const transparent_element = document.querySelector("#" + identifier + "-transparent");
        const title_element = document.querySelector("#" + identifier + "-title");

        function compute_url() {
            return (
                identifier +
                Screens.format_params({
                    subtitle: subtitle_element.value,
                    transparent: transparent_element.checked,
                    title: title_element.value,
                })
            );
        }

        function on_input(event) {
            const url = compute_url();
            const preview_url = Screens.format_preview_url(url);

            anchor_element.href = preview_url;
            iframe_element.src = preview_url;

            code_element.textContent = Screens.format_screen_url(url);
        }

        subtitle_element.addEventListener("input", on_input);
        transparent_element.addEventListener("input", on_input);
        title_element.addEventListener("input", on_input);

        return () => {
            subtitle_element.removeEventListener("input", on_input);
            transparent_element.removeEventListener("input", on_input);
            title_element.removeEventListener("input", on_input);
        };
    }

    return {make_editor};
})(window, document);

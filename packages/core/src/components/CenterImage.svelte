<script>
    import { cn } from "../libs/utils";
    import mediumZoom from "medium-zoom";

    export let src;
    export let alt;
    export let title;
    export let titleClass;
    export let zoomOptions = {
        background: "#050505"
    };

    const initialTitleClass =
        "text-center text-sm m-1 font-bold leading-relaxed text-gray-800 dark:text-gray-300";
    const initialImgClass = "rounded-t h-72 w-full object-scale-down";

    let zoom = undefined;

    function getZoom() {
        if (!zoom) {
            zoom = mediumZoom(zoomOptions);
            zoom.on("open", e => {
                e.target.classList.remove("h-72");
                e.target.classList.add("z-1001");
            });

            zoom.on("closed", e => {
                e.target.className = cn(e.target.className, "h-72");
            });
        }

        return zoom;
    }

    function attachZoom(image) {
        const zoom = getZoom();
        zoom.attach(image);

        return {
            update(newOpts) {
                zoom.update(newOpts);
            },
            destroy() {
                zoom.detach();
            }
        };
    }
</script>

<figure {...$$restProps}>
    <img
        {src}
        class={cn($$props.class, initialImgClass)}
        {alt}
        use:attachZoom={zoomOptions}
    />
    <figcaption>
        <p class={cn(initialTitleClass, titleClass)}>
            {title}
        </p>
    </figcaption>
</figure>

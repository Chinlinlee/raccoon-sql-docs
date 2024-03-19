<script>
    import CenterImage from "./CenterImage.svelte";

    export let items;
</script>

<div class="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each items as item}
        <div class="my-2 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
            <CenterImage
                src="{item.src}"
                alt="{item.title}"
                title="{item.title}"
            ></CenterImage>
        </div>
    {/each}
</div>
<script>
    export let items;
</script>

<div class="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each items as item}
        <div class="my-2 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
            <figure>
                <img src="{item.src}" alt="{item.title}" class="rounded-t h-72 w-full object-cover">
                <figcaption>
                    <p
                        class="text-center text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
                        <!-- Post Title -->
                        {item.title}
                    </p>
                </figcaption>
            </figure>
        </div>
    {/each}
</div>
<script>
  export let data;
  import "../app.css";
  import Header from "../components/Header.svelte";
</script>

<div class="flex flex-col w-full">
  <Header />
  <slot {data} />
</div>

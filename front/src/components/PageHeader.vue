<template>
  <el-page-header icon="" class="mb-7">
    <template #content>
      <div class="flex items-center">
        <el-avatar fit="scale-down" :size="32" class="mr-3 icon" src="/map.svg" />
        <span class="text-large font-600"> Obsidian Map File Generator </span>
      </div>
    </template>
  </el-page-header>
</template>

<style>
.ep-page-header__back {
  display: none;
}

.ep-divider {
  display: none;
}

.ep-avatar {
  background: white;
}

.icon {
  filter: invert(100%) sepia(94%) saturate(0%) hue-rotate(224deg) brightness(106%) contrast(107%);
}
</style>

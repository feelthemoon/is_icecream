<template>
  <div class="flex h-full w-full justify-center items-center">
    <div class="text-center max-w-750px">
      <div class="flex justify-center">
        <img
          class="w-185px h-125px"
          src="@/assets/static/logo.svg"
          alt="EasyIcecream"
        />
      </div>
      <h1 class="font-700 text-2xl mb-10px">
        {{ $t("pages.home.title") }}
      </h1>
      <p class="text-lg">
        {{ $t("pages.home.text") }}
      </p>
    </div>
  </div>
</template>

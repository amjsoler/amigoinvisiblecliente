<template>
  <transition name="dropdown">
    <slot />
  </transition>
</template>

<style>
  .dropdown-enter-active {
    opacity: 1;
    height: auto;
    transition: all 1s;
  }

  .dropdown-leave-active {
    opacity: 0;
    height: 0;
    transition: all 1s;
  }
</style>
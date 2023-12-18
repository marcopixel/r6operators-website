<template>
  <footer class="main-footer">
    <div class="container">
      <div class="main-footer-madewithlove">
        <span>
          Made with
          <HeartIcon class="main-footer-madewithlove-heart" />
        </span>
        <span>
          by
          <a href="https://github.com/marcopixel" target="_blank">@marcopixel</a>
          &
          <a href="https://github.com/marcopixel/r6operators/graphs/contributors" target="_blank">contributors.</a>
        </span>
      </div>
      <div class="main-footer-legal">
        <span>
          r6operators licensed under&nbsp;
          <a href="https://github.com/marcopixel/r6operators/blob/master/LICENSE">MIT License</a>
        </span>
        <span>
          This project is not affiliated with
          <span style="white-space: nowrap">Ubisoft Entertainment.</span>
          <br />
          Tom Clancy’s, Rainbow Six, The Soldier Icon, Ubisoft and the Ubisoft logo are trademarks of Ubisoft Entertainment.
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import HeartIcon from "@assets/icons/heart.svg?component"
</script>

<style lang="scss">
@use "sass:map";
@use "sass:color";
@use "styles/variables" as *;
@use "styles/mixins";
@use "styles/colors";

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }

  10% {
    transform: scale(1.1);
  }

  15% {
    transform: scale(1);
  }

  20% {
    transform: scale(1.1);
  }

  25% {
    transform: scale(1);
  }

  100% {
    transform: scale(1);
  }
}

.main-footer {
  padding-top: 5rem;
  padding-bottom: 3rem;

  > .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .main-footer-madewithlove {
    display: flex;
    flex-direction: column;
    align-items: center;
    letter-spacing: 0.02em;
    margin-bottom: 1rem;

    span {
      display: inline-flex;
      align-items: center;
    }

    .main-footer-madewithlove-heart {
      color: red;
      height: 1.2em;
      width: 1.2em;
      margin-left: 0.5em;
      animation: heartbeat 3s infinite;
      object-fit: contain;
      object-position: center center;
    }

    a {
      margin-left: 0.25em;
      margin-right: 0.25em;
    }

    @include mixins.breakpoint("sm") {
      flex-direction: row;
      margin-bottom: 1.5rem;

      .main-footer-madewithlove-heart {
        margin-right: 0.5em;
      }
    }
  }

  .main-footer-legal {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    font-size: 0.875em;
    opacity: 0.6;
  }
}
</style>

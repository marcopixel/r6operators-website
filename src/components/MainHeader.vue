<template>
  <header class="main-header">
    <div class="container">
      <div class="main-header-logo">
        <LogoSVG />
      </div>
      <h1 class="main-header-title">r6operators</h1>
      <div class="main-header-subtitle">r6operators is a collection of high-quality vectorized <span>Rainbow Six: Siege</span> operator icons & metadata for Node.js</div>
      <div className="main-header-githubtags">
        <a href="https://www.npmjs.com/package/r6operators">
          <img alt="npm" src="https://img.shields.io/npm/v/r6operators?style=for-the-badge" />
        </a>
        <a href="https://github.com/marcopixel/r6operators">
          <img src="https://img.shields.io/github/last-commit/marcopixel/r6operators.svg?style=for-the-badge" />
        </a>
        <a href="https://github.com/marcopixel/r6operators">
          <img src="https://img.shields.io/github/stars/marcopixel/r6operators.svg?style=for-the-badge" />
        </a>
        <a href="https://github.com/marcopixel/r6operators/network/members">
          <img src="https://img.shields.io/github/forks/marcopixel/r6operators.svg?style=for-the-badge" />
        </a>
        <a href="https://github.com/marcopixel/r6operators/subscription">
          <img src="https://img.shields.io/github/watchers/marcopixel/r6operators.svg?style=for-the-badge" />
        </a>
      </div>
      <div class="main-header-usage">
        <div className="main-header-usage-npm">
          <a class="main-header-usage-npm-install" href="https://www.npmjs.com/package/r6operators"> npm install r6operators </a>
          <div class="main-header-usage-npm-links">
            <a href="https://github.com/marcopixel/r6operators/blob/master/README.md#usage"> Getting started </a>
            <div className="divider">|</div>
            <a href="https://github.com/marcopixel/r6operators#reference">Documentation</a>
          </div>
        </div>
        <div className="main-header-usage-download">
          <a :href="`/r6operators-icons-${pkg.version}.zip`" download> Download </a>
          <span>SVG & PNG</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import pkg from "r6operators/package.json"
import LogoSVG from "@assets/logo.svg?component"
</script>

<style lang="scss">
@use "sass:map";
@use "sass:color";
@use "styles/variables" as *;
@use "styles/mixins";
@use "styles/colors";
@use "styles/animations";

.main-header {
  margin-top: 2rem;
  margin-bottom: 3rem;

  > .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .main-header-logo {
    svg {
      width: 8rem;
    }
  }

  .main-header-title {
    color: colors.$white;
    margin-top: 0;
  }

  .main-header-subtitle {
    margin-bottom: 2rem;
    max-width: 500px;

    span {
      white-space: nowrap;
    }
  }

  .main-header-githubtags {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2rem;

    a {
      margin: 0.2rem;
    }
  }

  .main-header-usage {
    display: flex;
    flex-direction: column;
    align-items: center;

    .main-header-usage-npm {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;

      .main-header-usage-npm-install {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 2rem;
        margin-bottom: 0.5rem;
        color: colors.$white;
        border-radius: $border-radius;
        font-size: 0.875em;
        font-family: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace;
        background: transparent;
        border: 1px solid rgba(colors.$gradient-step-2, 0.6);
        animation: gradient-animation-install 15s ease infinite;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: $border-radius;
          background-color: colors.$gradient-step-2;
          animation: gradient-animation-install-bg 15s ease infinite;
          transition: opacity 0.3s ease;
          z-index: -1;
          opacity: 0.2;
        }

        &:hover,
        &:focus {
          &::before {
            opacity: 0.4;
          }
        }
      }

      .main-header-usage-npm-links {
        display: flex;
        align-items: center;
        font-size: 0.875rem;

        .divider {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
      }
    }

    .main-header-usage-download {
      display: flex;
      flex-direction: column;
      justify-content: center;

      a {
        display: flex;
        align-items: center;
        padding: 0.5rem 1.75rem;
        margin-bottom: 0.5rem;
        color: colors.$white;
        border: 2px solid rgba(colors.$gradient-step-2, 1);
        border-radius: $border-radius;
        font-weight: map.get($fontweights, "bold");
        white-space: nowrap;
        animation: gradient-animation-button 15s ease infinite;

        &:hover,
        &:focus {
          transform: scale(1.1);
        }
      }

      span {
        font-size: 0.875em;
      }
    }
  }
}

@include mixins.breakpoint("lg") {
  .main-header {
    .main-header-logo {
      svg {
        width: 10rem;
      }
    }

    .main-header-title {
      font-size: 2.5em;
      margin-bottom: 1rem;
    }

    .main-header-githubtags {
      margin-bottom: 1rem;
    }

    .main-header-usage {
      flex-direction: row;

      .main-header-usage-npm {
        margin-bottom: 0;
        margin-left: 1rem;
        margin-right: 1rem;
      }

      .main-header-usage-download {
        margin-left: 1rem;
        margin-right: 1rem;
      }
    }
  }
}
</style>

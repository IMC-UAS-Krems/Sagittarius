<!--
  <template>
  <main class="about">
    <h1>About</h1>
  </main>
</template>

<style>
.about {
  font-family: Arial, sans-serif;
  margin-top: 3rem;
  color: #dadada;
  text-align: center;
}
</style>
-->
<template>
  <div class="box"></div>
</template>
<style>
:root {
  --background: #303030;
  --dark: #303032;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.box {
  position: relative;
  background: var(--dark);
  border: 0.25rem solid var(--dark);
  height: 9rem;
  width: 9rem;
  outline: 0;
  overflow: hidden;
}

.box::before {
  content: "About\00000aFrontend\00000av0.0.0\00000aClient\00000av0.0.0\00000aCompiler\00000av0.0.0";
  white-space: pre;
  color: white;
  font-size: fit-content;
  font-family: "Roboto", sans-serif;
  background: #1C1C1C;
  height: 100%;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.box::after {
  content: "";
  position: absolute;
  bottom: -50%;
  left: -50%;
  height: 200%;
  width: 200%;
  background-color: var(--background);
  border-radius: 35%; /* liquid effect */
  animation: spin 6s ease-in-out forwards; /* forwards freezes animation at the last frame */
  animation-delay: -1.5s;
}

@keyframes spin {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-100%) rotate(400deg);
  }
}

.about {
  font-family: Arial, sans-serif;
  margin-top: 3rem;
  color: #dadada;
  text-align: center;
}
</style>
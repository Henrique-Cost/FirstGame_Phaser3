/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {} from 'phaser';
import { Boot } from './scene/Boot';
import { Capa } from './scene/Capa';
import Fase01 from './scene/Fase01';
import Fase02 from './scene/Fase02';
import { Fase03 } from './scene/Fase03';
import { Fase04 } from './scene/Fase04';
import { Fase05 } from './scene/Fase05';
import { FimFase } from './scene/FimFase';
import { FimJogo } from './scene/FimJogo';
import { GameOver } from './scene/GameOver';

function iOS() {
  return (
    ['iPad Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

const mode = new URLSearchParams(window.location.search).get('mode');

if (iOS()) {
  document.getElementById('btnFullScreen')!.hidden = true;
}

if (mode) {
  if (mode === 'standalone') {
    document.getElementById('btnFullScreen')!.hidden = true;
  }
} else {
  document.getElementById('btnFullScreen')!.addEventListener(
    'click',
    () => {
      if (!document.fullscreenElement)
        document.documentElement.requestFullscreen();
      else if (document.exitFullscreen) document.exitFullscreen();
    },
    false
  );
}
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // true for mobile device
  console.log('mobile device');
} else {
  // false for not mobile device
  console.log('not mobile device');
}
const config = {
  type: Phaser.AUTO,
  //backgroundColor: '#FFFFFF',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  scene: [
    Boot,
    Capa,
    Fase01,
    Fase02,
    Fase03,
    Fase04,
    Fase05,
    GameOver,
    FimFase,
    FimJogo
  ],
  scale: {
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT
  },
  input: {
    activePointers: 2
  }
};

export default new Phaser.Game(config);

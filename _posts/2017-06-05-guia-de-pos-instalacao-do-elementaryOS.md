---
layout: post
title: "Guia de pós-instalação do elementaryOS"
date: 2017-06-05
---

# Guia de pós-instalação do elementaryOS

Depois de decidir instalar o elementaryOS em dual boot no meu desktop - e testá-lo por alguns dias - decidi usá-lo como sistema principal para desenvolvimento, usando meu notebook. Deixando o Windows 10 somente para jogos no meu desktop. Apósa instalação, que demorou mais do que eu esperava, talvez pela idade do meu notebook; voltei a alguns dos vários links com dicas sobre a pós-instalação deste SO.

### 1. Atualizar o Sistema

Essa é a mais básica das coisas a se fazer após a atualização de uma distro do linux - ao menos é o passo mais usado em todos os guias que eu li.

No elementaryOS você pode fazer essa atualização indo no [AppCenter] e na Aba [Atualizações].

### 2. Drivers de videos

Por sorte o elementaryOS identifica alguns dos drivers que são precisos instalar na máquina e os deixa disponível no [AppCenter], no meu caso eram drivers da Nvidia.

### 3. Ativar PPAs

O elementaryOS, por padrão, não vem com a habilidade de instalar softwares por PPA, então é preciso ativar esta função.

`sudo apt install software-properties-common`

### 4. Botão "Windows" para abrir todos os apps

Geralmente, usando "Windows + Espaço", a janela de aplicativos vai ser aberta. Mas é possível mudar isso, para utilizar apenas o botão "Windows".

`gsettings set org.gnome.mutter overlay-key "'Super_L'"`
`gsettings set org.pantheon.desktop.gala.behavior overlay-action "'wingpanel --toggle-indicator=app-launcher'"`

### 5. Instalar o TLP

Como estou usando no laptop, o TLP é a melhor opção para ajudar a gerenciar o uso da bateria e de outros processos e ainda previne o laptop de super aquecer.

`sudo apt install tlp`

### 6. "Nightshift mode"

No windows costumo usar o f.lux, e no linux temos o redshift.

`sudo apt install redshift redshift-gtk`

### 7. Dando um jeito no SAMBA

De acordo com alguns usuários, sendo o elementaryOS baseado no Ubuntu, ele trás consigo um "pequeno" bug que faz o cooler disparar em velocidade e o processador ficarm em 100% de uso.

E pelo visto o culpado é o [Samba]. Para resolver esse problema, basta usar esse código abaixo no terminal.

`sudo chmod 744 /usr/lib/gvfs/gvfsd-smb-browse`

### 8. Desinstalar programas que você não precisa

Essa é auto explicativa.

### 9. Instalar o LibreOffice

Uma distro baseada no Ubuntu, que vem sem o LibreOffice, parece estranho. Talvez seja para manter o sistema enxuto, de qualquer forma, segue o comando.

`sudo apt install libreoffice`

### 10. Instale os programas que te agradam!

Este guia enumera só algumas das principais coisas a serem feitas na pós instalação. No fim do post, vou deixar o link das referências que eu usei para reunir tudo isso. Entretanto, cada um tem a sua forma de usar personalizar o sistema; O elementaryOS possui várias opções para isso, e é possível até mesmo instalar o elementary Tweaks, para mudar a interface além do que é oferecido por padrão.

Se tiver gostado do post, compartilhe e comente quais os programas são essenciais para você. Eu sempre faço questão de adicionar o Chromium, Spotify e Telegram; E logo farei outro post, enumerando os passos que segui para configurar o ambiente de desenvolvimento.

*Referências*

[Things to do after installing elementary OS 0.4.1 Loki](https://medium.com/go-elementary/things-to-do-after-installing-elementary-os-0-4-1-loki-7d5516e75aff)
[11 Things To Do After Installing Elementary OS 0.4 Loki](https://itsfoss.com/things-to-do-after-installing-elementary-os-loki/)

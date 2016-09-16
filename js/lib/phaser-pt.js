class Motor{

    tela(width,height,parent){
        this.jogo = new Phaser.Game(width,height,Phaser.AUTO,parent);
    }

    corFundo(cor){
        this.jogo.stage.backgroundColor = cor;  
    }

    adicionarEstado(nomeEstado, estado){
       this.jogo.state.add(nomeEstado, estado);
    }

     activarEstado(estado){
        this.jogo.state.start(estado);
    }

    numeroToques(nToques){
        this.jogo.input.maxPointers = nToques;
    }
    paraComputador(){
        return this.jogo.device.desktop;
    }

    paraDispositivoMovel(){
        return !this.jogo.device.desktop;
    }

    definirDimensoes(minX,minY,maxX,maxY,horizontal){
      this.jogo.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.jogo.scale.minWidth = minX;
      this.jogo.scale.minHeight = minY;
      this.jogo.scale.maxWidth = maxX;
      this.jogo.scale.maxHeight = maxY;
      this.jogo.scale.forceLandscape = horizontal;
      this.jogo.scale.pageAlignHorizontally = true;
     
    }

    carregarImagem(id,origem){
        return this.jogo.load.image(id, origem);
    }

    //arranjar um nome mais bonitinho para hashtag
    carregarSprite(id, origem, largura,altura, hashtag){
        return this.jogo.load.spritesheet(id, origem, largura, altura, hashtag);
    }

    carregarSom(id, origem){
        return this.load.audio('gameMusic', [origem[0], origem[1]]);
    }

    utilizarImagem(x,y, ancora,id){
       var imagem = this.jogo.add.sprite(x, y, id);
       imagem.anchor.setTo(ancora);
       return imagem;
    }

    definirBarraCarregamento(imagem){
         return this.jogo.load.setPreloadSprite(imagem);
    }

    centroX(){
        return this.jogo.world.centerX;
    }
    centroY(){
        return this.jogo.world.centerY;
    }
} 


class Motor{

    constructor(){
       
        this.verdade=true;
        this.falso=false;
        
        this.tecla={
            "enter" : Phaser.KeyCode.ENTER,
            "cima" : Phaser.KeyCode.UP,
            "esquerda" : Phaser.KeyCode.LEFT,
            "direita" : Phaser.KeyCode.RIGHT,
            "baixo" : Phaser.KeyCode.DOWN,
        }
       
    }

   
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

    definirDimensoesMovel(minX,minY,maxX,maxY,horizontal){
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
    carregarAtlas(id,origemPNG,origemJSON){
        return this.jogo.load.atlas(id, origemPNG, origemJSON);
    }
 

    carregarSprite(id, origem, largura,altura, nImg){
        return this.jogo.load.spritesheet(id, origem, largura, altura, nImg);
    }
    carregarTextoBitmap(id,origemPNG,origemXML){
       return this.jogo.load.bitmapFont(id, origemPNG, origemXML);

    }
    carregarSom(id, origem){
        return this.jogo.load.audio(id, [origem[0], origem[1]]);
    }

    utilizarSom(id){
        return this.jogo.add.audio(id);
    }

    IniciarSom(objecto, volume,repetir){
         objecto.play('',0,volume,repetir);
    }

    utilizarImagem(x,y, ancora,id){
       var imagem = this.jogo.add.sprite(x, y, id);
       imagem.anchor.setTo(ancora);
       return imagem;
    }

    utilizarSprite(xInicial,yInicial,xFinal,yFinal,id){
        return this.jogo.add.tileSprite(xInicial, yInicial, xFinal, yFinal, id);
    }
    rotacaoImagem(imagem,rotacaoX,rotacaoY){
        imagem.autoScroll(rotacaoX, rotacaoY);
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

    larguraTela(){
         return this.jogo.width;
    }   
    alturaTela(){
         return this.jogo.height;
    } 
    largura(objecto){
        if(objecto)
            return objecto.width;
        else
            return 0;
    }
    altura(objecto){
        if(objecto)
            return objecto.height;
        else
            return 0;
    }

    somDescodificado(id){
        return this.jogo.cache.isSoundDecoded(id);
    }

    carregamentoCompleto(metodo,id){
        this.jogo.load.onLoadComplete.add(metodo, id);
    }
    adicionarTexto(x,y,texto,estilo){
        return this.jogo.add.text(x,y,texto, estilo);
    }

    adicionarTextoBitmap(x,y,id,texto,tamanho){
        return this.jogo.add.bitmapText(x, y, id,texto,tamanho);
    }



    teclaPressionada(idTecla){
        if(this.jogo.input.keyboard.isDown(this.tecla[idTecla]))
             return true;
         return false;

    }

    criarAnimacao(id,ordemAnimancao,objecto){
        objecto.animations.add(id, ordemAnimancao);
    }
    iniciarAnimacao(id,velocidade,repetir,objecto){
        objecto.animations.play(id, velocidade, repetir);
    }
    
    activarFisica(){
         this.jogo.physics.startSystem(Phaser.Physics.ARCADE);
    }
    utilizarFisica(objecto){
        this.jogo.physics.arcade.enableBody(objecto);
    }
    
    objectoPermiteFisica(objecto,valor){
        objecto.body.allowGravity = valor;
    }
    objectoNaoMovel(objecto,valor){
        objecto.body.immovable = valor;
    }
    
    objectoCollideComLimites(objecto, valor){
        objecto.body.collideWorldBounds = valor;
    } 

    definirGravidadeY(objecto, valor){
            objecto.body.gravity.y = valor;
    }

     definirGravidadeX(objecto, valor){
            objecto.body.gravity.x = valor;
    }

    definirVelocidadeY(objecto, valor){
            objecto.body.velocity.y = valor;
    }

     definirVelocidadeX(objecto, valor){
            objecto.body.velocity.x = valor;
    }

    tocarNoChao(objecto){
       return objecto.body.touching.down;
    }
    espelharSprite(objecto,lado){
        if(lado === "direita" && objecto.scale.x<0)
            objecto.scale.x *= -1;
        else if (lado === "esquerda" && objecto.scale.x>0)
            objecto.scale.x *= -1;

    }

    definirEscalaObjecto(objecto, escala){
        objecto.scale.setTo(escala);
    }
    novoGrupo(){
        return this.jogo.add.group();    
    }
    
    colisao(objecto,colisao){
         this.jogo.physics.arcade.collide(objecto, colisao);
    }
    sobreposicao(objecto,colisao,funcao, contexto){
        this.jogo.physics.arcade.overlap(objecto,colisao,funcao, null, contexto);
    }
    numeroAleatorio(inicio, fim){
        return this.jogo.rnd.integerInRange(inicio, fim );

    }

    adicionarElementoExistente(objecto){
        this.jogo.add.existing(objecto);
    }

    devolvePrimeiroElemento(objecto, valor){
       return objecto.getFirstExists(valor);
    }
} 


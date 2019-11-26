const categoryModel = require("../../model/front/categoryModel");

module.exports = {
     async miPhone(req,res){
          let miGood = await categoryModel.getMiGood();
          for(let i=0;i<miGood.length;i++){
               let id = miGood[i].id;
               let miGoodVersion = await categoryModel.getMiVersion({id});
               miGood[i].version = miGoodVersion;
          }
          res.send(miGood);
     },
     async redMiPhone(req,res){
          let redMiPhone = await categoryModel.getRedMiGood();
          for(let i=0;i<redMiPhone.length;i++){
               let id = redMiPhone[i].id;
               // console.log(id)
               let redMiGoodVersion = await categoryModel.getRedMivVersion({id});
              redMiPhone[i].version = redMiGoodVersion; 
          }
          res.send(redMiPhone);
     },
     async tv(req,res){
          let tvGood = await categoryModel.getTvGood();
          for(let i=0;i<tvGood.length;i++){
               let id = tvGood[i].id;
               let tvVersion = await categoryModel.getTvVersion({id});
               tvGood[i].version = tvVersion; 
          }
          res.send(tvGood);
     },
     async notebook(req,res){
          let notebookGood = await categoryModel.getNotebook();
          for  (let i=0;i<notebookGood.length;i++){
               let id = notebookGood[i].id;
               let notebookVersion = await categoryModel.getNotebookVersion({id});
               notebookGood[i].version = notebookVersion; 
          }
          res.send(notebookGood);
     },
     async smart(req,res){
          let smartGood = await categoryModel.getSmartGood();
          for  (let i=0;i<smartGood.length;i++){
               let id = smartGood[i].id;
               let smartVersion = await categoryModel.getNotebookVersion({id});
               smartGood[i].version = smartVersion; 
          }       
          res.send(smartGood);  
     },
     async headset(req,res){
          let headsetGood = await categoryModel.getHeadsetGood();
          for(let i=0;i<headsetGood.length;i++){
               let id = headsetGood[i].id;
               let headsetVersion = await categoryModel.getHeadsetVersion({id});
               headsetGood[i].version = headsetVersion;
          }
          res.send(headsetGood);
     },
     async power(req,res){
          let powerGood = await categoryModel.getPowerGood();
          for(let i=0;i<powerGood.length;i++){
               let id = powerGood[i].id;
               let powerVersion = await categoryModel.getHeadsetVersion({id});
               powerGood[i].version = powerVersion;
          }
          res.send(powerGood);         
     },
     async parts(req,res){
          let partsGood = await categoryModel.getPartsGood();
          for(let i=0;i<partsGood.length;i++){
               let id = partsGood[i].id;
               let partsVersion = await categoryModel.getHeadsetVersion({id});
               partsGood[i].version = partsVersion;
          }
          res.send(partsGood);  
     },
     async out(req,res){
          let outGood = await categoryModel.getOutGood();
          for(let i=0;i<outGood.length;i++){
               let id = outGood[i].id;
               let outVersion = await categoryModel.getHeadsetVersion({id});
               outGood[i].version = outVersion;
          }
          res.send(outGood);  
     },
     async life(req,res){
          let lifeGood = await categoryModel.getLifeGood();
          for(let i=0;i<lifeGood.length;i++){
               let id = lifeGood[i].id;
               let lifeVersion = await categoryModel.getHeadsetVersion({id});
               lifeGood[i].version = lifeVersion;
          }
          res.send(lifeGood);  
     },
     async health(req,res){
          let healthGood = await categoryModel.getHealthGood();
          for(let i=0;i<healthGood.length;i++){
               let id = healthGood[i].id;
               let healthVersion = await categoryModel.getHeadsetVersion({id});
               healthGood[i].version = healthVersion;
          }
          res.send(healthGood);  
     }
};
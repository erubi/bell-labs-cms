BellCMS.Collections.Modules = Backbone.Collection.extend({
  model: BellCMS.Models.Module,

  url: 'api/media_modules',

  comparator: 'name',

  getOrFetch: function(id){
    var modules = this;

    var module;
    if (module = this.get(id)){
      module.fetch();
    } else {
      module = new BellCMS.Models.Module({id: id});
      module.fetch({
        success: function() { modules.add(item) }
      });
    }

    return module;
  },

  codeTypeSubset: function(){
    var subset = new Backbone.VirtualCollection(this, {
      filter: function(module){
        return (module.get('scene_type') == 'code');
      }
    });

    return subset;
  },

  weightedSubset: function(){
    var subset = new Backbone.VirtualCollection(this, {
      filter: function(module){
        return (module.get('scene_type') == 'code') &&
                (module.get('name') != 'Video Player');
      }
    });

    return subset;
  },

  weightSum: function(){
    var weights = this.pluck('weight');
    var total = weights.reduce(function(a, b){
      return a + b;
    });

    return total;
  },

  getInactive: function(activeId){
    return this.filter(function(module){
      return module.id != activeId;
    });
  },

  setRestInactive: function(activeId){
    var inactiveModels = this.getInactive(activeId);
    inactiveModels.forEach(function(model, index){
      model.set('active', false);
    });
  },

  randomizeWeights: function(){
    var coll = this.weightedSubset();
    var randWeights = this.randomWeightArray(coll.length);

    this.resetWeights();

    coll.each(function(model, ind){
      model.set('weight', randWeights[ind]);
      model.save();
    });
  },

  resetWeights: function(){
    this.each(function(model){
      model.set('weight', 0);
      model.save();
    });
  },

  randomWeightArray: function(len){
    var weightSum;
    var weights = [];
    var result = [];

    _(len).times(function(){
      weights.push(Math.random());
    });

    weightSum = _.reduce(weights, function(memo, num){
      return memo + num;
    }, 0);

    result = weights.map(function(num){
      return parseFloat((num /= weightSum).toFixed(2));
    });

    resultSum = _.reduce(result, function(memo, num){
      return memo + num;
    }, 0);

    if (resultSum <= 1){
      return result;
    } else {
      return this.randomWeightArray(len);
    }

  }

});

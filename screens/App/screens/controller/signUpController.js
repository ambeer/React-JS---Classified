//import { signUpModel } from '../signupmodel/signUpModel';
//import { signUpCollection } from '../signupmodel/signUpModel';

export function store() {
    var username, password, email;
    var Model = Backbone.Model.extend({
        defaults: function() {
            username = $('input[name=Username]').val();
            email = $('input[name=email]').val();
            password = $('input[name=password]').val();
        }
    });
    var Collection = Backbone.Collection.extend({
        model: Model,
        localStorage: new Backbone.LocalStorage("credentials")
    });

    var item = new Collection();
    item.fetch();
    var item1 = new Model();
    item1.set('username', username);
    item1.set('email', email);
    item1.set('password', password);
    item.add(item1);
    item1.save();
    console.log('saved');

}


//export default signUpController;
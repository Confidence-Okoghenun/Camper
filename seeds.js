let mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

let data = [
  { name: 'Montana Creek',
    image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=500&q=60',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fugiat doloremque, distinctio, iste voluptas et quaerat aliquid facilis obcaecati doloribus id aut culpa eos ut velit dolores inventore atque eveniet!'
    },

  { name: 'Salome Creek',
    image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=500&q=60',
    description: 'Ipsum dolor sit amet consectetur adipisicing elit. Eaque, sit dolor saepe architecto sint dolorum ut optio velit rerum placeat excepturi quae eos consectetur et quidem tenetur! Minima, praesentium ducimus!'
    },

  { name: 'Lake Yekiti',
    image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=500&q=60',
    description: 'Dolor, sit amet consectetur adipisicing elit. Pariatur perspiciatis nisi saepe nihil at nulla ut minima dolor accusantium consequatur, fugiat quae perferendis autem molestias atque, obcaecati voluptates consequuntur officia.'
  },

  {name: 'Mt. Mouybokomi',
    image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=500&q=60',
    description: 'Asit amet consectetur adipisicing elit. Porro natus aspernatur, quibusdam nulla tempore voluptates numquam fugit atque laboriosam laudantium repellat expedita itaque odit. Ipsum, sequi? Ex, necessitatibus quibusdam! Aliquam.'
  }
]

function seedDB() {
  Campground.remove({}, (err, camps) => {
    if (err) console.log(err);
    else {
      console.log(`Deleted ${camps}`);
 
      data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
          if (err) console.log('***AN ERROR HAS OCCURED!***', err);
          else {
            console.log(campground);
            Comment.create({
              text: 'Pariatur perspiciatis nisi saepe nihil at nulla ut minima dolor accusantium consequatur, fugiat quae perferendis autem molestias atque, obcaecati voluptates consequuntur officia.',
              author: 'Bos'
            }, (err, comment) => {
              if(err) console.log(err)
              else {
                campground.comments.push(comment);
                campground.save();
                console.log('Created new comments');
              }
            })
          }
        });
      });
    }
  });
}

module.exports = seedDB;
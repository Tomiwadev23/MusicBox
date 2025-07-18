 export const musicSchema = {
  name: 'playlist',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'song', type: 'string' },
    { name: 'artist', type: 'string' },
    { name: 'added', type: 'boolean' },
    { name: 'image', type: 'string' },
    { name: 'img', type: 'string' },
    { name: 'story', type: 'string' },
    {name:'track',type:'string'}

  ],
  default_sorting_field: 'artist'
};
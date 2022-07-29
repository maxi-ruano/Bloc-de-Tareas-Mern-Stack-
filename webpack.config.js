
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");


// module.exports={
//  entry:'./src/app/index.js',
//  output:{
//     path: path.resolve(__dirname ,'dist'),
//     filename:'bundle.js',
//  },
//  module:{

//    rules:[
//       {
//          test:/\.js$/,
//          exclude:/node_modules/,
//          use:{
//           loader:  "babel-loader",
//          options:{
//             presets:["@babel/preset-env","@babel/preset-react"],
//          },
//          },
//       },
      
      
//    ],
   
//  },
//  plugins:[
//    new HtmlWebpackPlugin({
//       template: path.join(__dirname,"./src/index.html"),

//    }),
//  ],
//  devServer:{
    
  
//    port:3000,
//  },
 

// };
module.exports={
    entry:'./src/app/index.js',
    output:{
       path:__dirname + '/src/public',
       filename:'bundle.js',
    },
    module:{
   
      rules:[
         {
            test:/\.js$/,
            exclude:/node_modules/,
            use:{
             loader:  "babel-loader",
            options:{
               presets:["@babel/preset-env","@babel/preset-react"],
            },
            },
         },
         
         
      ],
      
    },
    plugins:[
      new HtmlWebpackPlugin({
         template: path.join(__dirname,"./src/index.html"),
   
      }),
    ],
    devServer:{
       
     
      port:3000,
    },
    
   
   };
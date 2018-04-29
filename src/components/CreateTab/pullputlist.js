// import React, { Component } from 'react'
// import Sortable from 'sortablejs'

// module.exports = {

//   snareput: (snare) => {
//     if (snare) {
//       let options = {
//         group: {
//           name: 'snare',
//         }
//       };
//       Sortable.create(snare, options);
//     }
//   },
//   pull: snare => {
//     // check if backing instance not null
//     if (snare) {
//       let options = {
//         draggable: "li", // Specifies which items inside the element should be sortable
//         group: {
//           name: "snare",
//           pull: "clone",
//           revertClone: true,
//   }
//       }
//       Sortable.create(snare, options)
//     }
//   },
//   hihatput: (hihat) => {
//     if (hihat) {
//       let options = {
//         group: {
//           name: 'hihat',
//         }
//       };
//       Sortable.create(hihat, options);
//     }
//   },
//   pullhihat: hihat => {
//     // check if backing instance not null
//     if (hihat) {
//       let options = {
//         draggable: "li", // Specifies which items inside the element should be sortable
//         group: {
//           name: "hihat",
//           pull: "clone",
//           revertClone: true,
//   }
//       }
//       Sortable.create(hihat, options)
//     }
//   }
// }
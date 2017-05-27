// // app.directive('customer', function () {
// //     // return {
// //     //     template: 'Name: Syed Zainul Abiddin<br /> Street: 3314 wells Drive Parlin NJ 08859'
// //     // };
// //      return {
// //         restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
// //         scope: {
// //             //@ reads the attribute value, = provides two-way binding, & works with functions
// //             title: '@'         },        
// //         templateUrl: './partial/editCust.html',
// //        // controller: customerDemoCtrl, //Embed a custom controller in the directive        
// //     }
// // });
// app.directive('display-cust', function() {
// //   return {
// //       templateUrl: './partial/login/details.html'      
// //   }
//    return {
//         restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
//         scope: {
//             //@ reads the attribute value, = provides two-way binding, & works with functions
//             title: '@'         },        
//         templateUrl: './partial/login/details.html'
//        // controller: customerDemoCtrl, //Embed a custom controller in the directive        
//     }
// });

app.directive('exp-directive', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'         },        
        templateUrl: 'partial/exp-dir.html',
        controller: expCtrl, //Embed a custom controller in the directive
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
});

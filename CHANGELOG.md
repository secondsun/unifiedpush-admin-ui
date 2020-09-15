# [0.2.0](https://github.com/secondsun/unifiedpush-admin-ui/compare/2.2.0...0.2.0) (2020-09-15)


### Bug Fixes

* 🐛 android form validation didn't check the variant name ([1ea7c0e](https://github.com/secondsun/unifiedpush-admin-ui/commit/1ea7c0e018f5f05cb3834086ddad948915ee09d2))
* 🐛 app and variant statistics were not working properly ([9abda54](https://github.com/secondsun/unifiedpush-admin-ui/commit/9abda544c8e46ea17761b9ceda4a3bf49762ec5f))
* 🐛 create variant status was not correctly initialised ([d5dbef1](https://github.com/secondsun/unifiedpush-admin-ui/commit/d5dbef17c1e170c6796f34bc68c43a7c80b3c8c2))
* 🐛 fixed messages count in application list ([38d95b5](https://github.com/secondsun/unifiedpush-admin-ui/commit/38d95b5311e393a03691762c50363105698aa0a1))
* 🐛 fixed status reset when changing variant type ([ca2f376](https://github.com/secondsun/unifiedpush-admin-ui/commit/ca2f376a6d9b2a0356a9c42bb5b4ac0dc3c6b6bf))
* 🐛 fixed status reset when changing variant type (ioscert) ([385adc9](https://github.com/secondsun/unifiedpush-admin-ui/commit/385adc9563e7a03b9943da215aa5f84aa41b2762))
* 🐛 fixed variant doc links in the wizard ([1a9363c](https://github.com/secondsun/unifiedpush-admin-ui/commit/1a9363c25e3c6e2a58bbf388db6547dfba3c77d9))
* 🐛 fixed webpush alias validation ([b2bd3a2](https://github.com/secondsun/unifiedpush-admin-ui/commit/b2bd3a2e30cb9329bf6d1f20750d2cb2d654ddd0))
* 🐛 now we can skip to step 5/6 only after having an app ([7fafcce](https://github.com/secondsun/unifiedpush-admin-ui/commit/7fafcce7e6002a53bf0ac53f99dafc0650b28e6d))
* 🐛 Various fixes for the wizard pages ([6a7e6f7](https://github.com/secondsun/unifiedpush-admin-ui/commit/6a7e6f7cb97ca3b5c6d6ccd79273346dbbdb36a4))
* adding build image ([3b6c425](https://github.com/secondsun/unifiedpush-admin-ui/commit/3b6c4255e016d6b398c691ffebf096e3cb3958b6))
* UPS_DISABLED is a string, not a string array ([9e0c9ac](https://github.com/secondsun/unifiedpush-admin-ui/commit/9e0c9ac91515a91cbbef57859d1a44b2014ddf81))
* **activity_log:** separate 0 pages for no messages and no devices ([0cebd05](https://github.com/secondsun/unifiedpush-admin-ui/commit/0cebd056463d6c2464dc299846d4fc8b4d725cef))
* **alerting:** fixed error handling ([3b7a161](https://github.com/secondsun/unifiedpush-admin-ui/commit/3b7a161276bbfc511966f3863402db6c425b71ca))
* **application:** fixed null error when refreshing on page detail ([7456cc8](https://github.com/secondsun/unifiedpush-admin-ui/commit/7456cc8c75b5f279e440d4955f71e4c609cbedb3))
* **config:** the static server does wrong things if config does not have an extension ([424081d](https://github.com/secondsun/unifiedpush-admin-ui/commit/424081dcd14eaf6697428abb1e495fd5b261268e))
* **css:** added hover styles for the applist ([1b00baa](https://github.com/secondsun/unifiedpush-admin-ui/commit/1b00baa48dcc11c2f9a1878917ed4451558245c5))
* **ios-token:** fixed status reset when changing variant type ([b5e7ec2](https://github.com/secondsun/unifiedpush-admin-ui/commit/b5e7ec263a5d5b75b48912567c42128c01132495))
* **patternfly:** updated patternfly to the correct version ([790a375](https://github.com/secondsun/unifiedpush-admin-ui/commit/790a375003adcd0c688d5279e009ad8804c1a60b))


### Features

* 🎸 added add variant feature in app detail page ([d1714bf](https://github.com/secondsun/unifiedpush-admin-ui/commit/d1714bf1e4b4c6de5f36828cb3743da84ae47c99))
* 🎸 added logout and username info ([9b216bb](https://github.com/secondsun/unifiedpush-admin-ui/commit/9b216bb3890efc4eeb1c8ed720ed77a3870c1ad2))
* 🎸 adding dynamic configuration ([f880df3](https://github.com/secondsun/unifiedpush-admin-ui/commit/f880df319962aa1675048aafa65b68baa19ba82a))
* 🎸 changed npm serve to nginx ([8392b83](https://github.com/secondsun/unifiedpush-admin-ui/commit/8392b83a25b8e653b7fef28c2410d352e9b2a16e))
* 🎸 integrated UPS_DISABLED configuration into admin ui ([b1c4fb5](https://github.com/secondsun/unifiedpush-admin-ui/commit/b1c4fb5bc18b97dd8c6c5cc094aa71a0f559ab4f))
* Activity Log ([a8ba7b1](https://github.com/secondsun/unifiedpush-admin-ui/commit/a8ba7b106f5652928dd3c4b134ed8363d9448ed2))
* added a new component to handle secrets ([b25f817](https://github.com/secondsun/unifiedpush-admin-ui/commit/b25f817dbbb32dbb2c6e6a7d27c9ac9b4ff08d4a))
* container image ([a943c7a](https://github.com/secondsun/unifiedpush-admin-ui/commit/a943c7acde247c34ba0b32bfe983883411492992))
* push senderui ([29e5267](https://github.com/secondsun/unifiedpush-admin-ui/commit/29e52672ba86e46aaf78e84a2cfeee356697f2dd))
* **alerting:** added ability to show alert toasts ([#73](https://github.com/secondsun/unifiedpush-admin-ui/issues/73)) ([553f971](https://github.com/secondsun/unifiedpush-admin-ui/commit/553f97173d60490c79c740d919830735b4221cb6))
* **applications:** added the router component so that we can avoid using a dialog for the app details ([#78](https://github.com/secondsun/unifiedpush-admin-ui/issues/78)) ([3d51fdd](https://github.com/secondsun/unifiedpush-admin-ui/commit/3d51fdd6d231bb7519b7e2c83a5870adbdbfbad6))
* **applications:** added the sender API panel ([bfa5c49](https://github.com/secondsun/unifiedpush-admin-ui/commit/bfa5c49fb9e01fb11bc24a66b76559872b3e1dfe))
* **docs:** added dynamic links as received from the UPS server ([743b673](https://github.com/secondsun/unifiedpush-admin-ui/commit/743b6730b0572c37f7a771368e1bddb2f9f61667))
* **ios:** implemented ios certificate variant details ([#71](https://github.com/secondsun/unifiedpush-admin-ui/issues/71)) ([9700f6d](https://github.com/secondsun/unifiedpush-admin-ui/commit/9700f6d9deebcf2e35fc2ccf6aa382c59104cb35))
* **ios:** implementing iosTokenVariant details ([#70](https://github.com/secondsun/unifiedpush-admin-ui/issues/70)) ([698fbeb](https://github.com/secondsun/unifiedpush-admin-ui/commit/698fbebed26953a6ce0fe7e75de27b4841d26aa3))
* **variant:** added Android variant details panel ([#62](https://github.com/secondsun/unifiedpush-admin-ui/issues/62)) ([64e5d78](https://github.com/secondsun/unifiedpush-admin-ui/commit/64e5d78fbdf8c83459ef5a0640e8249b60b6b530))
* **variant:** added No Variants page ([#63](https://github.com/secondsun/unifiedpush-admin-ui/issues/63)) ([496939e](https://github.com/secondsun/unifiedpush-admin-ui/commit/496939e9ac6b8b0b08534a3ec2cdeb07522d9ab4))
* **webpush:** implemented webpush variant details ([#72](https://github.com/secondsun/unifiedpush-admin-ui/issues/72)) ([64bece1](https://github.com/secondsun/unifiedpush-admin-ui/commit/64bece1bf4fa134413ff09a879c5c78445c7cb38))



# 2.2.0 (2019-09-30)




export default {
  translation: {
    LoginPage: {
      cardFooter: 'Нет аккаунта?',
      cardFooterRegistrationBtn: 'Регистрация',
      LoginForm: {
        signIn: 'Войти',
        yourNickname: 'Ваш ник',
        authFailed: 'Неверные имя пользователя или пароль',
      },
    },
    regPage: {
      regForm: {
        regError: {
          minOrMaxLengthUsername: 'От 3 до 20 символов',
          minLengthPassword: 'Не менее 6 символов',
          mandatoryField: 'Обязательное поле',
          passwordsMustMatch: 'Пароли должны совпадать',
          userExist: 'Такой пользователь уже существует',

        },
        usernameLable: 'Имя пользователя',
        confirmPassword: 'Подтвердите пароль',
        signUpBtn: 'Зарегистрироваться',
      },
    },
    notFoundPage: {
      header: 'Страница не найдена',
      paragraph: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
    chatPage: {
      chat: {
        counterMessage: {
          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_many: '{{count}} сообщений',
        },
        header: 'Каналы',
        dropdown: 'Управление каналом',
        dropdownToggle: 'Управление каналом',
        dropdownDelete: 'Удалить',
        dropdownRename: 'Переименовать',
        newMessage: 'Новое сообщение',
        enterMessage: 'Введите сообщение...',
        sendBtn: 'Отправить',
      },
    },
    modals: {
      addChannel: {
        title: 'Добавить канал',
        label: 'Имя канала',

      },
      removeChannel: {
        title: 'Удалить канал',
        paragraph: 'Уверены?',
      },
      renameChannel: {
        title: 'Переименовать канал',
        label: 'Имя канала',
      },
      cancelBtn: 'Отменить',
      sendBtn: 'Отправить',
      deleteBtn: 'Удалить',
      errValid: {
        minOrMaxLengthUsername: 'От 3 до 20 символов',
        notUniqueName: 'Должно быть уникальным',
      },
    },
    notifications: {
      connectionError: 'Ошибка соединения',
      channelAdd: 'Канал создан',
      channelRemove: 'Канал удалён',
      channelRename: 'Канал переименован',
    },
    exitBtn: 'Выйти',
    password: 'Пароль',
    registration: 'Регистрация',
    loading: 'Загрузка',
  },
};

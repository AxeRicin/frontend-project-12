export default {
  translation: {
    LoginPage: {
      card_footer: 'Нет аккаунта?',
      card_footer_registrationBtn: 'Регистрация',
      LoginForm: {
        sign_in: 'Войти',
        your_nickname: 'Ваш ник',
        authFailed: 'Неверные имя пользователя или пароль',
      },
    },
    reg_page: {
      reg_form: {
        reg_error: {
          min_or_max_length_username: 'От 3 до 20 символов',
          min_length_password: 'Не менее 6 символов',
          mandatory_field: 'Обязательное поле',
          passwords_must_match: 'Пароли должны совпадать',
          user_exist: 'Такой пользователь уже существует',

        },
        username_lable: 'Имя пользователя',
        confirm_password: 'Подтвердите пароль',
        sign_up_btn: 'Зарегистрироваться',
      },
    },
    not_found_page: {
      header: 'Страница не найдена',
      paragraph: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
    chat_page: {
      chat: {
        counter_message: {
          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_many: '{{count}} сообщений',
        },
        header: 'Каналы',
        dropdown_toggle: 'Управление каналом',
        dropdown_delete: 'Удалить',
        dropdown_rename: 'Переименовать',
        new_message: 'Новое сообщение',
        enter_message: 'Введите сообщение...',
        send_btn: 'Отправить',
      },
    },
    modals: {
      add_channel: {
        title: 'Добавить канал',
        label: 'Имя канала',

      },
      remove_channel: {
        title: 'Удалить канал',
        paragraph: 'Уверены?',
      },
      rename_channel: {
        title: 'Переименовать канал',
        label: 'Имя канала',
      },
      cancel_btn: 'Отменить',
      send_btn: 'Отправить',
      delete_btn: 'Удалить',
      err_valid: {
        min_or_max_length_username: 'От 3 до 20 символов',
        notunique_name: 'Должно быть уникальным',
      },
    },
    notifications: {
      connection_error: 'Ошибка соединения',
      channel_add: 'Канал создан',
      channel_remove: 'Канал удалён',
      channel_rename: 'Канал переименован',
    },
    exit_btn: 'Выйти',
    password: 'Пароль',
    registration: 'Регистрация',
    loading: 'Загрузка',
  },
};

// Usuarios y sesión
class Usuario {
  constructor(id_usuario, nombre, email, password, es_corporativo) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.es_corporativo = es_corporativo;
    this.OrdenCompra = [];
  }
}

const lista_usuarios = {};
const sesion = { usuario_id: null };

function registrarUsuario(objetoUsuario) {
  lista_usuarios[objetoUsuario.id_usuario] = objetoUsuario;
  if (objetoUsuario.es_corporativo) {
    console.log(
      `🧍${objetoUsuario.nombre} ha sido registrado/a correctamente como usuario corporativo`,
    );
  } else {
    console.log(`🧍${objetoUsuario.nombre} ha sido registrado/a correctamente`);
  }
}

function es_corporativoUsuario(usuario_id) {
  return lista_usuarios[usuario_id]?.es_corporativo || false;
}

function buscarUsuario(id_usuario) {
  if (id_usuario in lista_usuarios) {
    return lista_usuarios[id_usuario];
  } else {
    return false;
  }
}

function loguearUsuario(email, password) {
  for (let id in lista_usuarios) {
    const u = lista_usuarios[id];
    if (u.email === email && u.password === password) {
      sesion.usuario_id = u.id_usuario;
      console.log(`✔️  El usuario se logueó correctamente`);
      return true;
    }
  }
  console.log(`❌ Error al loguearse`);
  return false;
}

function cerrarSesion() {
  sesion.usuario_id = null;
}

function estaLogueado() {
  return sesion.usuario_id !== null;
}

export {
  Usuario,
  lista_usuarios,
  registrarUsuario,
  es_corporativoUsuario,
  buscarUsuario,
  loguearUsuario,
  sesion,
  cerrarSesion,
  estaLogueado,
};

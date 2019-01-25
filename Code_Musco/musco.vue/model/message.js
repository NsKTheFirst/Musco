const messageModel = function messageModel(connection) {

    // Requête de création
    const create = function createMessage(clbk, data) {
      const sql = "INSERT INTO messages (date, sujet, message, id_emetteur, id_receveur) VALUES (?, ?, ?, ?, ?)";
      const payload = [data.date, data.sujet, data.message, data.id_emetteur, data.id_receveur];
  
      connection.query(sql, payload, (err, res) => { //retrait de cols
        // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
        if (err) return clbk(err, null);
        return clbk(null, res);
      });
    };
  
    // Requête de suppression
    const remove = function deleteMessage(clbk, id_message) {
      // la clause SQL IN permet de chercher une valeur dans un tableau
      const sql = "DELETE FROM messages WHERE id_message = ?";
      console.log(sql + " " + id_message);

  
      connection.query(sql, id_message, function (err, res) { //retrait de fields
        // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
        if (err) return clbk(res, null);
        return clbk(null, res);
      });
    };
  
    // Requête de mise à jour
    const update = function editMessage(clbk, messages) {
      const sql = "UPDATE messages SET date = ?, sujet = ?, message = ?, id_emetteur = ?, id_receveur = ? WHERE id_message = ?";
      const payload = [messages.date, messages.sujet, messages.message, messages.id_emetteur, messages.id_receveur, messages.id_message];
      connection.query(sql, payload, function (err, res) { //retrait de fields
        // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
        if (err) return clbk(err, null);
        return clbk(null, res);
      });
    };
  
    // Requête de récupération
    const get = function getMessage(clbk, id_message) {
      let sql;
      if (id_message && !isNaN(id_message)) {
        sql = "SELECT *, u.pseudo, u.avatar FROM messages AS m INNER JOIN users AS u ON u.id_user = m.id_emetteur WHERE m.id_message = ?";
      } else {
        sql = "SELECT * FROM messages";
      }
      connection.query(sql, [id_message], (error, results) => { //retrait de fields
        // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
        if (error) return clbk(error, null);
        return clbk(null, results);
      });
    };

    const getOwned = function getOwnedMessage(clbk, id_receveur) {
      const sql = "SELECT m.id_message, m.date, m.sujet, m.message, m.id_emetteur, m.id_receveur, u.pseudo, u.avatar FROM messages AS m INNER JOIN users AS u ON u.id_user = m.id_emetteur WHERE m.id_receveur = ? ORDER BY m.id_message DESC";
      connection.query(sql, [id_receveur], (error, results) => {
        if (error) return clbk(error, null);
        return clbk(null, results);
      });
    };

  
    return {
      create,
      remove,
      update,
      get,
      getOwned
    };
  };
  
  module.exports = messageModel;
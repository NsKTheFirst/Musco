const skillsModel = function skillsModel(connection) {

    // ****** Requêtes sur la table skills ******
    // Requête de récupération
    const get = function getSkills(clbk, id_skill) {
        let sql;
        if (id_skill && !isNaN(id_skill)) {
          sql = "SELECT * FROM skills as s WHERE s.id_skill = ?";
        } else {
          sql = "SELECT * FROM skills";
        }
        connection.query(sql, [id_skill], (error, results) => {
          // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
          if (error) return clbk(error, null);
          return clbk(null, results);
        });
    };

    // ****** Requête sur la table annonce_needs_skills ******
    // Requête de creation
    const create = function createAns(clbk, data) {
      let sql = "INSERT INTO annonce_needs_skills (id_annonce_skill, id_skills_needed) VALUES (?, ?)";
      const payload = [data.id_annonce_skill, data.id_skills_needed];
        connection.query(sql, payload, (err, res) => {
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };

    // Requête de suppression
    const remove = function removeAnnonce (clbk, id_annonce_skill) {
      const sql = "DELETE FROM annonce_needs_skills WHERE id_annonce_skill = ?";
      console.log(sql + " " + id_annonce_skill);
      connection.query(sql, id_annonce_skill, function (err, res) {
          if (err) return clbk(err, null);
          return clbk(null, res);
      });
    };

    // Requête d'édition
    const update = function updateAnnonce (clbk, annonce_needs_skills) {
      const sql = "UPDATE annonce_needs_skills SET id_skills_needed = ? WHERE id_annonce_skill = ?";
      const payload = [annonce_needs_skills.id_skills_needed, annonce_needs_skills.id_annonce_skill];
      connection.query(sql, payload, function (err, res) {
          if (err) return clbk(err, null);
          return clbk(null, res);
      });
    };

    const getAns = function getAns (clbk, id_annonce_skill) {
      let sql;
      if (id_annonce_skill && !isNaN(id_annonce_skill)) {
        sql = "SELECT * FROM annonce_needs_skills WHERE id_annonce_skill = ?";
      } else {
          sql = "SELECT * FROM annonce_needs_skills";
      }
      connection.query(sql, [id_annonce_skill], (error, results) => {
        if (error) return clbk(error, null);
        return clbk(null, results);
      });
    };
    
    return {
        get,
        create,
        remove,
        update,
        getAns

    }
};

module.exports = skillsModel
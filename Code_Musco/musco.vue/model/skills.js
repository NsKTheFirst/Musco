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

    // ****** Requête sur la table users_skills ******
    // Requête de récupération
    
    return {
        get
    }
};

module.exports = skillsModel
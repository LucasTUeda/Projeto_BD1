package br.com.sistemaacademico.dao;

import br.com.sistemaacademico.model.Avaliacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;

@Repository
public class AvaliacaoDAO {

    private final JdbcTemplate jdbctemplate;

    @Autowired
    public AvaliacaoDAO(JdbcTemplate jdbctemplate){
        this.jdbctemplate = jdbctemplate;
    }

    public int salvar(Avaliacao avaliacao){
        String sql = "INSERT INTO Avaliacao(titulo, data_fim, id_professor, id_disciplina)" +
                    "VALUES(?, ?, ?, ?)";

        KeyHolder keyholder = new GeneratedKeyHolder();

        jdbctemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id_avaliacao"});

            ps.setString(1, avaliacao.getTitulo());
            ps.setDate(2, new java.sql.Date(avaliacao.getDataFim().getTime()));
            ps.setInt(3, avaliacao.getIdProfessor());
            ps.setInt(4, avaliacao.getIdDisciplina());

            return ps;
        },keyholder);

        return keyholder.getKey().intValue();


    }
}

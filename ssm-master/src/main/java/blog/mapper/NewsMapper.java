package blog.mapper;

import blog.dao.News;
import blog.dto.output.NewDetails;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by Administrator on 2018/10/27.
 */
public interface NewsMapper {
    public int insertNews(News news);
    public List<NewDetails> selectNews(@Param("biaoti") String biaoti ,@Param("chuangjianren") String chuangjianren );
    public List<NewDetails> selectoederAction();
    public int deleteNews(String  id);

}

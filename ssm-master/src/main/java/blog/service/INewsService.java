package blog.service;

import blog.dao.News;
import blog.dto.output.NewDetails;

import java.util.List;

/**
 * Created by Administrator on 2018/10/27.
 */
public interface INewsService {
    public int insertNews( String id,String biaoti, String neirong,String chuangjianren, String riqi);
    public List<NewDetails> selectNews(String biaoti, String chuangjianren);
    public List<NewDetails> selectoederAction();
    public int deleteNews( String id);
}

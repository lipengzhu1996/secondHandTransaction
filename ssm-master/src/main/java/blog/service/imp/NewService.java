package blog.service.imp;

import blog.dao.Commodity;
import blog.dao.News;
import blog.dto.output.NewDetails;
import blog.mapper.CommodityMapper;
import blog.mapper.NewsMapper;
import blog.service.INewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018/10/27.
 */
@Service
public class NewService implements INewsService {

    @Autowired
    private NewsMapper newsmapper;

    @Override
    public int insertNews( String id,String biaoti, String neirong,String chuangjianren, String riqi) {
        News  news= new News();
         news.setId(id);
        news.setBiaoti(biaoti);
        news.setNeirong(neirong);
        news.setChuangjianren(chuangjianren);
        // tupian= Base64Test.GetImageStr(tupian);
        news.setRiqi(riqi);

        int num=newsmapper.insertNews(news);
        return num;
    }

    @Override
    public List<NewDetails> selectNews( String biaoti,String chuangjianren) {
        List<NewDetails> news =newsmapper.selectNews(biaoti,chuangjianren);
        return news;
    }


    @Override
    public int deleteNews(String id) {
        int num=newsmapper.deleteNews(id);
        return num;
    }

    @Override
    public  List<NewDetails> selectoederAction() {
        List<NewDetails> newDetails=newsmapper.selectoederAction();
        return newDetails;
    }

}

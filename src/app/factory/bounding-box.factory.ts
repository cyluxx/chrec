import { BoundingBox } from 'chrec-core/lib/model/bounding-box';
import { ImportService } from 'chrec-core/lib/service/import.service';

export class BoundingBoxFactory {

  private importService: ImportService = new ImportService();

  public fromChannelContent(channelContent: any): BoundingBox {
    return new BoundingBox(channelContent.x, channelContent.y, channelContent.width, channelContent.height);
  }

  public fromStorageJson(parsedJson: any): BoundingBox {
    return this.importService.reviveBoundingBox(parsedJson);
  }
}

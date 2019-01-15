import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@blox/material";

@NgModule({
	imports: [CommonModule, MaterialModule],
	declarations: [],
	exports: [MaterialModule],
	providers: []
})
export default class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error(
				"CoreModule is already loaded. Import it in the AppModule only"
			);
		}
	}
}

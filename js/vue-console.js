/*
	vue-console
	Basic JavaScript Console for Mobile Devices

	Released under MIT License
	Copyright (c) 2017 Cali Rojas
	https://github.com/calirojas506/vue-console
*/

Vue.component('vue-console', {
	props: {
		isVisible: {
			required: false,
			default: true,
			type: Boolean
		}
	},
	template: `
		<div class="c-vue-console" :class="{hidden: !isVisible}">
			<div class="container-fluid">
				<div class="c-vue-console__header row">
					<div class="col-xs-12">
						<div class="panel panel-primary">
							<div class="panel-heading" @click="togglePanelBody">
								<h3 class="panel-title">
									{{componentName}}
									<span class="pull-right close"
									@click="toggleVisibility">&times;</span>
								</h3>
								<span class="small">{{componentDescription}}</span>
							</div>
							<div class="panel-body" v-show="logs.length" ref="panelBody"
							:class="{'hidden' : !panelBodyIsVisible}">
								<ul class="list-unstyled small">
									<li v-for="log in logs" :class="{'text-muted': log.message == 'undefined'}">
										<span class="label" :class="'label-' + log.style">&nbsp;</span>
										{{log.message}}
									</li>
								</ul>
							</div>
							<div class="panel-footer">
								<form @submit.prevent="execute" @reset.prevent="resetForm">
									<div class="form-group">
										<div class="input-group">
											<span class="input-group-btn">
												<button class="btn btn-danger btn-sm" type="reset">&times;</button>
											</span>
											<input type="text" class="form-control input-sm"
											autocapitalize="none" v-model="commandInput" ref="commandInput">
											<span class="input-group-btn">
												<button class="btn btn-primary btn-sm" type="submit">&check;</button>
											</span>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	data(){
		return {
			componentName: 'vue-console',
			componentDescription: 'Basic JavaScript Console for Mobile Devices',
			commandInput: '',
			logs: [],
			panelBodyIsVisible: true
		}
	},
	methods: {
		toggleVisibility(){
			this.isVisible = !this.isVisible;
		},
		togglePanelBody(){
			this.panelBodyIsVisible = !this.panelBodyIsVisible;
		},
		execute(){
			if(this.commandInput.trim() =='') return false;

			if(!this.commandInput.startsWith('console.')){
				this.logs.push({
					message: (window.eval(this.commandInput) ? eval(this.commandInput) : 'undefined'),
					style: 'primary'
				});
			}else{
				window.eval(this.commandInput);
			}

			this.selectCommandInput();
		},
		consoleLog(...message){
			this.logs.push({
				message: message.join(' '),
				style: 'primary'
			});
		},
		consoleError(...message){
			this.logs.push({
				message: message.join(' '),
				style: 'danger'
			});
		},
		consoleInfo(...message){
			this.logs.push({
				message: message.join(' '),
				style: 'info'
			});
		},
		consoleWarn(...message){
			this.logs.push({
				message: message.join(' '),
				style: 'warning'
			});
		},
		consoleClear(){
			this.logs = [];
		},
		init(){
			console.log = this.consoleLog;
			console.error = this.consoleError;
			console.warn = this.consoleWarn;
			console.clear = this.consoleClear;
			console.info = this.consoleInfo;

			window.onerror = null;
			let _this = this;
			window.onerror = function(message, url, line, column, errObject){
				_this.consoleError(message, url, line + ':' + column);
				_this.selectCommandInput();
			}
		},
		resetForm(){
			this.commandInput = '';
			this.$refs.commandInput.focus();
		},
		selectCommandInput(){
			let input = this.$refs.commandInput;

			input.setSelectionRange(0, input.value.length);
		}
	},
	created(){
		this.init();
	},
	watch: {
		logs(){
			let panelBody = this.$refs.panelBody;

			panelBody.scrollTop = panelBody.scrollHeight;
		}
	}
});